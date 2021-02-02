const express = require('express');
const initController = require ('../controllers/init.controllers');
const router = express.Router();

const usersController = require('../controllers/users.controllers');

router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);
router.get('/home', initController.inicio);

module.exports = router;
