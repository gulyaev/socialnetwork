const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware');
const postController = require('../controllers/post.controller')

router.post('/post', authMiddleware, postController.createPost)
router.get('/get', authMiddleware, postController.getPosts)
router.get('/post/:id', authMiddleware, postController.getOnePost)
router.put('/post', authMiddleware, postController.updatePost)
router.delete('/post/:id', authMiddleware, postController.deletePost)

module.exports = router