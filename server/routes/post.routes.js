const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("../controllers/post.controller");

router.post("/post", authMiddleware, postController.createPost);
router.get("/post", authMiddleware, postController.getPostsByActiveUser);
router.get("/allpost", postController.getAllPosts);
router.get("/post/:id", authMiddleware, postController.getOnePost);
router.put("/post/:id", authMiddleware, postController.updatePost);
router.delete("/post/:id", authMiddleware, postController.deletePost);

module.exports = router;
