const Router = require("express");
const categoryController = require("../controllers/category.controller");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post("/category", authMiddleware, categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);

module.exports = router;
