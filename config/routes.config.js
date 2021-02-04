const express = require('express');
const initController = require ('../controllers/init.controllers');
const router = express.Router();

const usersController = require('../controllers/users.controllers');

router.get('/home', initController.inicio);
router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);


module.exports = router;