const db = require("../db");
const bcrypt = require("bcryptjs");

class UserController {
  async getUsers(req, res) {
    try {
      const currentPage = parseInt(req.query.currentpage);
      const perPage = parseInt(req.query.perpage);

      const startIndex = (currentPage - 1) * perPage;
      const endIndex = currentPage * perPage;

      const users = await db.query(`select * from person`);

      const results = {};

      if (endIndex < users.rows.length) {
        results.next = {
          currentPage: currentPage + 1,
          perPage: perPage,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          currentPage: currentPage - 1,
          perPage: perPage,
        };
      }
      results.totalCount = users.rows.length;

      //вывод пользователей в пределах заданного размера порции:
      results.results = users.rows.slice(startIndex, endIndex);

      if (!users) throw Error("No items");

      if (currentPage && perPage) {
        res.status(200).json(results);
      } else {
        res.status(200).json(users.rows);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query(`SELECT * FROM person where id=$1`, [id]);
      res.json(user.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(req, res) {
    const { nikname, email, password } = req.body;
    const userId = req.user.id; //loggedin
    const id = req.params.id;

    if (userId == id) {
      try {
        let user = null;
        if (req.body.password) {
          req.body.password = await bcrypt.hash(req.body.password, 15);

          user = await db.query(
            `update person set nikname=$2, email=$3, password=$4 where id=$1 RETURNING *`,
            [id, nikname, email, req.body.password]
          );
        } else {
          user = await db.query(
            `update person set nikname=$2, email=$3 where id=$1 RETURNING *`,
            [id, nikname, email]
          );
        }

        res.json(user.rows[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(401).json("You can update only your account");
    }
  }

  async deleteUser(req, res) {
    const userId = req.user.id; //loggedin
    const id = req.params.id;

    if (userId == id) {
      try {
        const user = await db.query(`DELETE FROM person where id=$1`, [id]);
        res.status(200).json({ message: "User has been deleted" });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(401).json("You can delete only your account");
    }
  }

  followUser(req, res) {
    const { id } = req.body; // following to
    const userId = req.user.id; //loggedin

    const p = new Promise((resolve, reject) => {
      const user = db.query(
        `update person set followings = array_append(followings, $1) where id=$2 RETURNING *`,
        [id, userId]
      );
      resolve(user);
    });
    p.then((data) => {
      db.query(
        `update person set followers = array_append(followers, $2) where id=$1 RETURNING *`,
        [id, userId]
      );
      res.status(200).json(data.rows[0]);
    });
  }

  unfollowUser(req, res) {
    const { id } = req.body; // following to
    const userId = req.user.id; //loggedin

    const p = new Promise((resolve, reject) => {
      const user = db.query(
        `update person set followings = array_remove(followings, $1) where id=$2 RETURNING *`,
        [id, userId]
      );
      resolve(user);
    });
    p.then((data) => {
      db.query(
        `update person set followers = array_remove(followers, $2) where id=$1 RETURNING *`,
        [id, userId]
      );
      res.status(200).json(data.rows[0]);
    });
  }

  async getStatus(req, res) {
    try {
      const userId = req.user.id;
      const status = await db.query(`SELECT * FROM person where id=$1`, [
        userId,
      ]);
      res.json(status.rows[0].status);
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(req, res) {
    try {
      const userId = req.user.id;
      const { status } = req.body;
      const newStatus = await db.query(
        `update person set status=$2 where id=$1 RETURNING *`,
        [userId, status]
      );
      res.json(newStatus.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
