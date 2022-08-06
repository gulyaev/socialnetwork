const db = require("../db");

class PostController {
  async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const newPost = await db.query(
        `insert into post (title, content, person_id, likes, dislikes, views, comments) values ($1, $2, $3, 1, 1, 1, 1) RETURNING *`,
        [title, content, userId]
      );
      res.status(200).json(newPost.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(req, res) {
    try {
      const userId = req.user.id;
      const posts = await db.query(`select * from post where person_id = $1`, [
        userId,
      ]);
      res.status(200).json(posts.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getOnePost(req, res) {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
      const post = await db.query(
        `select * from post where id=$1 and person_id=$2`,
        [postId, userId]
      );
      res.status(200).json(post.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(req, res) {
    try {
      const { id, title, content } = req.body;
      const userId = req.user.id;
      const post = await db.query(
        `update post set title=$2, content=$3 where id=$1 and person_id=$4 RETURNING *`,
        [id, title, content, userId]
      );
      res.status(200).json(post.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(req, res) {
    try {
      const postId = req.params.id;
      const post = await db.query(`DELETE FROM post where id=$1`, [postId]);
      res.status(200).json({ message: "Post was deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PostController();
