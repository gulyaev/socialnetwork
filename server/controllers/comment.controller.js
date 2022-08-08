const db = require("../db");

class CommentController {
  async createComment(req, res) {
    try {
      const { content, postId } = req.body;
      const userId = req.user.id;

      const p = new Promise((resolve, reject) => {
        const newComment = db.query(
          `insert into comment (content, post_id, writer) values ($1, $2, $3) RETURNING *`,
          [content, postId, userId]
        );
        resolve(newComment);
      });

      p.then((receivedNewComment) => {
        return new Promise((resolve, reject) => {
          const comments = db.query(
            `select * from comment join person on writer=person.id where post_id=$1`,
            [postId]
          );
          resolve(comments);
        });
      }).then((receivedComments) => {
        res.status(200).json({ success: true, result: receivedComments.rows });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCommentsByPostId(req, res) {
    try {
      const comments = await db.query(
        `select * from comment where post_id = $1`,
        [postId]
      );
      res.status(200).json(comments.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async updateComment(req, res) {
    try {
      const { id, content } = req.body;
      const userId = req.user.id;
      const comment = await db.query(
        `update comment set content=$2 where id=$1 and post_id=$3 RETURNING *`,
        [id, content, postId]
      );
      res.status(200).json(comment.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const comment = await db.query(`DELETE FROM comment where id=$1`, [
        commentId,
      ]);
      res.status(200).json({ message: "Comment was deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommentController();
