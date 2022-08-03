const db = require("../db");
const fileService = require("../services/fileService");
const config = require("config");
const fs = require("fs");

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
}

module.exports = new FileController();
