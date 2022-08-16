const db = require("../db");

class PostController {
  async createPost(req, res) {
    try {
      const { category, title, content, photo } = req.body;
      const userId = req.user.id;

      const p = new Promise((resolve, reject) => {
        const newPost = db.query(
          `insert into post (title, content, person_id, likes, dislikes, views, comments, photo) values ($1, $2, $3, 1, 1, 1, 1, $4) RETURNING *`,
          [title, content, userId, photo]
        );
        resolve(newPost);
      });

      p.then((receivedNewPost) => {
        return new Promise((resolve, reject) => {
          const post = db.query(
            `update post set categories = array_cat(categories, $1) where id=$2 RETURNING *`,
            [category, receivedNewPost.rows[0].id]
          );
          resolve(post);
        });
      }).then((createdPost) => {
        db.query(`insert into category (title) values ($1) RETURNING *`, [
          category,
        ]);
        res.status(200).json({ success: true, result: createdPost.rows[0] });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getPostsByActiveUser(req, res) {
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

  async getAllPosts(req, res) {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await db.query(
          `select p.id as post_id,
          p.title as post_title,
          p.content as post_content,
          p.likes as post_likes,
          p.dislikes as post_dislikes,
          p.views as post_views,
          p.comments as post_comments,
          p.categories as post_categories,
          p.postdate as post_postdate,
          p.photo as post_photo,
          per.id as person_id,
          per.nikname as person_nikname,
          per.avatar as person_avatar
      from post as p
      inner join person as per on per.id = p.person_id where nikname=$1`,
          [username]
        );
      } else if (catName) {
        posts = await db.query(
          `select p.id as post_id,
          p.title as post_title,
          p.content as post_content,
          p.likes as post_likes,
          p.dislikes as post_dislikes,
          p.views as post_views,
          p.comments as post_comments,
          p.categories as post_categories,
          p.postdate as post_postdate,
          p.photo as post_photo,
          per.id as person_id,
          per.nikname as person_nikname,
          per.avatar as person_avatar
      from post as p
      inner join person as per on per.id = p.person_id where  $1=ANY(categories)`,
          [catName]
        );
      } else {
        posts = await db.query(
          `select p.id as post_id,
          p.title as post_title,
          p.content as post_content,
          p.likes as post_likes,
          p.dislikes as post_dislikes,
          p.views as post_views,
          p.comments as post_comments,
          p.categories as post_categories,
          p.postdate as post_postdate,
          p.photo as post_photo,
          per.id as person_id,
          per.nikname as person_nikname,
          per.avatar as person_avatar
      from post as p
      inner join person as per on per.id = p.person_id`
        );
      }
      res.status(200).json(posts.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getOnePost(req, res) {
    try {
      const postId = req.params;
      //const userId = req.user.id;

      const post = await db.query(
        //`select * from post where id=$1 and person_id=$2`,
        `select * from post where id=$1`,
        [postId.id]
        //[postId, userId]
      );
      res.status(200).json(post.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(req, res) {
    const { title, content } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    try {
      const post = await db.query(`select * from post where id=$1`, [postId]);
      if (post.rows[0].person_id == userId) {
        try {
          const updatedPost = await db.query(
            `update post set title=$2, content=$3 where id=$1 and person_id=$4 RETURNING *`,
            [postId, title, content, userId]
          );
          res.status(200).json(updatedPost.rows[0]);
        } catch (error) {
          console.log(error);
        }
      } else {
        res.status(401).json("You can update only your post");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(req, res) {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
      const post = await db.query(`select * from post where id=$1`, [postId]);
      if (post.rows[0].person_id == userId) {
        try {
          const deleted = await db.query(`DELETE FROM post where id=$1`, [
            postId,
          ]);
          res.status(200).json({ message: "Post has been deleted" });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.status(401).json("You can delete only your post");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PostController();
