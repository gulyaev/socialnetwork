const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
const commentController = require("../controllers/comment.controller");

router.post("/comment", authMiddleware, commentController.createComment);
router.get("/comment", commentController.getCommentsByPostId);
router.put("/comment", authMiddleware, commentController.updateComment);
router.delete("/comment/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
