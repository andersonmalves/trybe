const express = require('express');
const { categoryController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/categories', authMiddleware.checkIfUserIsAuthenticated,
  categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);

module.exports = router;