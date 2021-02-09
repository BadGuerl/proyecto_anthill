const express = require('express');
const passport = require('passport');
const router = express.Router();
const initController = require('../controllers/init.controllers');
const homeController = require('../controllers/home.controllers');
const usersController = require('../controllers/users.controllers');
const servicesController = require('../controllers/services.controllers');
const boardController = require('../controllers/board.controllers');
const secure = require('../middlewares/secure.middleware');


router.get('/inicio', initController.inicio);
router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);
router.post('/logout', usersController.logout);
router.get('/home', secure.isAuthenticated , homeController.vervista);
router.get('/profile', secure.isAuthenticated , usersController.userProfile);
router.get('/offers', secure.isAuthenticated , servicesController.offersList);
router.get('/board', secure.isAuthenticated , boardController.boardList);
router.get('/new', secure.isAuthenticated , servicesController.newOffer);


module.exports = router;