const express = require('express');
const initController = require ('../controllers/init.controllers');
const router = express.Router();


router.get('/home', initController.inicio);
module.exports = router;
