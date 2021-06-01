const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/user', userController.createUser);
router.post('/login', userController.userLogin);
router.get('/user', authMiddleware.checkIfUserIsAuthenticated, userController.getAllUsers);

module.exports = router;