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
            `select c.id as comment_id,
            c.content as comment_content,
            c.post_id as comment_postid,
            c.response_to as comment_responseto,
            c.writer as comment_writer,
            per.id as person_id,
            per.nikname as person_nikname,
            per.avatar as person_avatar
        from comment as c
        inner join person as per on per.id = c.writer where post_id=$1`,
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

  async createCommentReply(req, res) {
    try {
      const { content, response_to, postId } = req.body;
      const userId = req.user.id;

      const p = new Promise((resolve, reject) => {
        const newComment = db.query(
          `insert into comment (content, response_to, post_id, writer) values ($1, $2, $3, $4) RETURNING *`,
          [content, response_to, postId, userId]
        );
        resolve(newComment);
      });

      p.then((receivedNewComment) => {
        return new Promise((resolve, reject) => {
          const comments = db.query(
            `select c.id as comment_id,
              c.content as comment_content,
              c.response_to as comment_responseto,
              c.post_id as comment_postid,
              c.writer as comment_writer,
              per.id as person_id,
              per.nikname as person_nikname,
              per.avatar as person_avatar
          from comment as c
          inner join person as per on per.id = c.writer where post_id=$1`,
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
      const { postId } = req.body;
      const comments = await db.query(
        `select c.id as comment_id,
            c.content as comment_content,
            c.post_id as comment_postid,
            c.response_to as comment_responseto,
            c.writer as comment_writer,
            per.id as person_id,
            per.nikname as person_nikname,
            per.avatar as person_avatar
        from comment as c
        inner join person as per on per.id = c.writer where post_id=$1`,
        [postId]
      );
      res.status(200).json({ success: true, comments: comments.rows });
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
