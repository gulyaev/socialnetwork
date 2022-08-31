const Router = require("express");
const userController = require("../controllers/user.controller");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.put("/user/:id", authMiddleware, userController.updateUser);
router.delete("/user/:id", authMiddleware, userController.deleteUser);
router.put("/follow", authMiddleware, userController.followUser);
router.put("/unfollow", authMiddleware, userController.unfollowUser);
router.get("/status", authMiddleware, userController.getStatus);
router.put("/user/status/updatestatus", authMiddleware, userController.updateStatus);

module.exports = router;
