const express = require('express');
const passport = require('passport');
const router = express.Router();
const initController = require('../controllers/init.controllers');
const homeController = require('../controllers/home.controllers');
const usersController = require('../controllers/users.controllers');
const servicesController = require('../controllers/services.controllers');
const secure = require('../middlewares/secure.middleware');

router.get('/inicio', initController.inicio);
router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);

router.post('/logout', secure.isAuthenticated , usersController.logout);
router.get('/home', secure.isAuthenticated , homeController.vervista);
router.get('/profile', secure.isAuthenticated , usersController.userProfile);
router.post('/profile', secure.isAuthenticated , usersController.updateProfile);
router.get('/offers', secure.isAuthenticated , servicesController.offersList);
router.get('/service/new', secure.isAuthenticated , servicesController.newOffer);
router.post('/service/new', secure.isAuthenticated ,servicesController.addService);
router.get('/service/:id/delete', secure.isAuthenticated ,servicesController.deleteService);
router.get('/users/:id', secure.isAuthenticated, usersController.visitOtherProfile);
router.post('/offers/filter', secure.isAuthenticated ,servicesController.searchService);


module.exports = router;