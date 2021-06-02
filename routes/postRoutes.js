const express = require('express');
const { postController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/post', authMiddleware.checkIfUserIsAuthenticated, postController.createPost);

module.exports = router;