const db = require("../db");
const fileService = require("../services/fileService");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, user_id, parent } = req.body;

      const userId = req.user.id;
      console.log("userId from fileController " + userId);

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
      } else {
        newFile.rows[0].path = `${parentFile.rows[0].name}/${newFile.rows[0].name}`;
        await fileService.createDir(newFile.rows[0]);
        parentFile.rows[0].childs.push(newFile.rows[0].id);
      }

      return res.json(newFile.rows[0]);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getFiles(req, res) {
    const userId = req.user.id;
    const { parent } = req.query;

    try {
      const files = await db.query(
        `select * from files where (person_id=$1 and parent=$2)`,
        [userId, parent]
      );
      return res.json(files.rows);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get files" });
    }
  }
}

module.exports = new FileController();
