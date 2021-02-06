const express = require('express');
const router = express.Router();
const initController = require('../controllers/init.controllers');
const homeController = require('../controllers/home.controllers');
const usersController = require('../controllers/users.controllers');
const servicesController = require('../controllers/services.controllers');
const boardController = require('../controllers/board.controllers');

router.get('/inicio', initController.inicio);
router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);
router.get('/home', homeController.vervista);
router.get('/profile', usersController.userProfile);
router.get('/offers', servicesController.offersList);
router.get('/board', boardController.boardList);
router.get('/new', servicesController.newOffer);


module.exports = router;