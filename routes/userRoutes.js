const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/user', userController.createUser);

module.exports = router;