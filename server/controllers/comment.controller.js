const db = require("../db");

class CommentController {
  async createComment(req, res) {
    try {
      const { content, postId } = req.body;
      const userId = req.user.id;

      const p = new Promise((resolve, reject) => {
        const newComment = db.query(
          `insert into comment (content, post_id, writer, likes, dislikes) values ($1, $2, $3, 0, 0) RETURNING *`,
          [content, postId, userId]
        );
        resolve(newComment);
      });

      p.then(()=>{
        return new Promise((resolve, reject)=>{
          const post = db.query(`update post set comments = comments + 1 where id=$1 RETURNING *`, [postId]);
          resolve(post);
        });
      }).then(() => {
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

      p.then(()=>{
          return new Promise((resolve, reject)=>{
            const post = db.query(`update post set comments = comments + 1 where id=$1 RETURNING *`, [postId]);
            resolve(post);
          });
      }).then(()=>{
        return new Promise((resolve, reject)=>{
          const resp_comment = db.query(`select c.id as responsetocomment_id,
          c.writer as responseto_writerid,
          per.id as responsetowriter_id,
          per.nikname as responsetowriter_nikname 
      from comment as c
      inner join person as per on per.id = c.writer where c.id=$1 `, [response_to]);
          resolve(resp_comment);
        });
      }).then((respToComment) => {
        return new Promise((resolve, reject) => {
          console.log(respToComment);
          resolve(respToComment);
        });
      }).then((respComment) => {
        return new Promise((resolve, reject) => {
          let commentArray = respComment.rows
          let responsetowriter_nikname = commentArray[0].responsetowriter_nikname
        resolve(responsetowriter_nikname);
        });
      }).then((responsetowriter_nikname)=>{
        return new Promise((resolve, reject)=>{
          const updatedComment = db.query(`update comment set responseto_nikname = $1 where response_to=$2 RETURNING *`, 
          [responsetowriter_nikname, response_to]);
          resolve(updatedComment);
        });
      }).then(() => {
        return new Promise((resolve, reject) => {
          const comments = db.query(
            `select c.id as comment_id,
              c.content as comment_content,
              c.response_to as comment_responseto,
              c.post_id as comment_postid,
              c.writer as comment_writer,
              c.responseto_nikname as comment_responsetonikname,
              per.id as person_id,
              per.nikname as person_nikname,
              per.avatar as person_avatar
          from comment as c
          inner join person as per on per.id = c.writer where post_id=$1`,
            [postId]
          );
          resolve(comments);
        });
      }).then((comments) => {
        res.status(200).json({ success: true, result: comments.rows });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCommentsByPostId(req, res) {
    try {
      const { postId } = req.body;

      const p = new Promise((resolve, reject) => {
        const commentsWithWriterName = db.query(
          `select c.id as comment_id,
              c.content as comment_content,
              c.post_id as comment_postid,
              c.response_to as comment_responseto,
              c.writer as comment_writer,
              c.responseto_nikname as comment_responsetonikname,
              c.commentdate as comment_commentdate,
              c.likes as comment_likes,
              c.dislikes as comment_dislikes,
              per.id as person_id,
              per.nikname as person_nikname,
              per.avatar as person_avatar
          from comment as c 
          inner join person as per on per.id = c.writer where post_id=$1`,
          [postId]
        );
        resolve(commentsWithWriterName);
      });

      p.then((comments)=>{
        return new Promise((resolve, reject) => {
        resolve(comments)
      })
        }).then((receivedComments) => {
          res.status(200).json({ success: true, comments: receivedComments.rows });
      })
    } catch (error) {
      console.log(error);
    }
  }

  async updateComment(req, res) {
    try {
      const { content } = req.body;
      const commentId = req.params.id;
      const userId = req.user.id;
      const comment = await db.query(
        `update comment set content=$2 where id=$1 and id=$3 RETURNING *`,
        [commentId, content, commentId]
      );
      res.status(200).json(comment.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;

      const p = new Promise((resolve, reject) => {
        const post = db.query(`select (post_id) from comment where id=$1`, [commentId]);
          resolve(post);
      });
      
      p.then((post)=>{
        const postId = post.rows[0].post_id
        return new Promise((resolve, reject)=>{
          const post = db.query(`update post set comments = comments - 1 where id=$1 RETURNING *`, [postId]);
          resolve(post);
        });
      }).then(()=>{
        return new Promise((resolve, reject)=>{
          const comment = db.query(`DELETE FROM comment where id=$1`, [
            commentId,
          ]);
          resolve(comment);
         });
      })
      .then(() => {
        res.status(200).json({ message: "Comment was deleted" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async likeComment(req, res) {
    const commentId = req.params.id;
    const userId = req.user.id;

    try {
          const likedComment = await db.query(
            `update comment set likes=likes+1 where id=$1 RETURNING *`,
            [commentId]
          );
          res.status(200).json(likedComment.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async dislikeComment(req, res) {
    const commentId = req.params.id;
    const userId = req.user.id;

    try {
          const dislikedComment = await db.query(
            `update comment set dislikes=dislikes+1 where id=$1 RETURNING *`,
            [commentId]
          );
          res.status(200).json(dislikedComment.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommentController();
