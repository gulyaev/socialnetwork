const db = require("../db");

class CategoryController {
  async createCategory(req, res) {
    try {
      const { title } = req.body;
      const userId = req.user.id;

      const newCat = await db.query(
        `insert into category (title) values ($1) RETURNING *`,
        [title]
      );
      res.status(200).json(newCat.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await db.query(`select * from category`);
      res.status(200).json(categories.rows);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CategoryController();
