const express = require('express');
const { postController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/post', authMiddleware.checkIfUserIsAuthenticated, postController.createPost);
router.get('/post', authMiddleware.checkIfUserIsAuthenticated, postController.getAllPosts);
router.get('/post/:id', authMiddleware.checkIfUserIsAuthenticated, postController.getPostById);

module.exports = router;