const db = require("../db");
const fileService = require("../services/fileService");
const config = require("config");
const fs = require("fs");
const Uuid = require("uuid");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const userId = req.user.id;

      const newFile = await db.query(
        `INSERT INTO files (name, type, person_id, parent) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, type, userId, parent]
      );

      var parentFile = null;

      if (parent) {
        parentFile = await db.query(`select * from files where id=$1`, [
          parent,
        ]);
        console.log("parentFile name ", parentFile.rows[0].name);
      }

      if (!parentFile) {
        newFile.rows[0].path = name;
        await fileService.createDir(newFile.rows[0]);
        await db.query(`update files set path = $1 where id=$2 RETURNING *`, [
          newFile.rows[0].path,
          newFile.rows[0].id,
        ]);
      } else {
        newFile.rows[0].path = `${parentFile.rows[0].name}/${newFile.rows[0].name}`;
        await fileService.createDir(newFile.rows[0]);
        //parentFile.rows[0].childs.push(newFile.rows[0].id);
        await db.query(
          `update files set childs = array_append(childs, $2) where id=$1 RETURNING *`,
          [parent, newFile.rows[0].id]
        );
        await db.query(`update files set path = $1 where id=$2 RETURNING *`, [
          newFile.rows[0].path,
          newFile.rows[0].id,
        ]);
      }

      res.json(newFile.rows[0]);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getFiles(req, res) {
    const userId = req.user.id;
    const { parent } = req.query;
    let files = null;

    try {
      if (!parent) {
        files = await db.query(`select * from files where (person_id=$1)`, [
          userId,
        ]);
      } else {
        files = await db.query(
          `select * from files where (person_id=$1 and parent=$2)`,
          [userId, parent]
        );
      }

      return res.json(files.rows);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get files" });
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file;
      const userId = req.user.id;
      //const { parent } = req.query;
      const parent = req.body.parent;

      const parentFile = await db.query(
        `select * from files where person_id=$1 and id=$2`,
        [userId, parent]
      );

      let path;
      if (parent) {
        path = `${config.get("filePath")}/${userId}/${
          parentFile.rows[0].path
        }/${file.name}`;
      } else {
        path = `${config.get("filePath")}/${userId}/${file.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File exists" });
      }

      file.mv(path);
      const type = file.name.split(`.`).pop();

      const newFile = await db.query(
        `INSERT INTO files (name, type, person_id, path, size, parent) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [file.name, type, userId, path, file.size, parent]
      );

      if (parent) {
        await db.query(
          `update files set childs = array_append(childs, $2) where id=$1 RETURNING *`,
          [parent, newFile.rows[0].id]
        );
      }

      res.json(newFile.rows[0]);
    } catch (error) {
      console.log(error);
      res.send({ message: "Server error" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const userId = req.user.id;

      const avatarName = Uuid.v4() + ".jpg";

      file.mv(config.get("staticPath") + "/" + avatarName);

      const user = await db.query(
        `update person set avatar=$1 where id=$2 RETURNING *`,
        [avatarName, userId]
      );

      //return res.json({ message: "Avatar was uploaded" });
      return res.json(user.rows[0]);
    } catch (error) {
      console.log(error);
      res.send({ message: "Upload avatar server error" });
    }
  }

  async deleteAvatar(req, res) {
    try {
      const userId = req.user.id;

      const user = await db.query(`SELECT * FROM person where id=$1`, [userId]);
      fs.unlinkSync(`${config.get("staticPath")}/${user.rows[0].avatar}`);

      const user1 = await db.query(
        `update person set avatar=$1 where id=$2 RETURNING *`,
        [null, userId]
      );
      return res.json(user1.rows[0]);
    } catch (error) {
      console.log(error);
      res.send({ message: "Upload avatar server error" });
    }
  }
}

module.exports = new FileController();
