const Router = require("express");
const userController = require("../controllers/user.controller");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.put("/user", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/follow", authMiddleware, userController.followUser);
router.put("/unfollow", authMiddleware, userController.unfollowUser);

module.exports = router;
