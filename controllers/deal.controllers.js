const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const createError = require('http-errors');
const Service = require('../models/service.model');
const Deal = require('../models/deal.model');


module.exports.dealer = (req, res, next) => {
    res.render ('deal');
}
