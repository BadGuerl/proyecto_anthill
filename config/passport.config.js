const passport = require('passport');
const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => next(null, user))
    .catch(next);
});

passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          next(null, null, { email: 'Email o contraseña no válido'})
        } else {
          return user.checkPassword(password)
            .then(match => {
              if (match) {
                next(null, user)
              } else {
                next(null, null, { email: 'Email o contraseña no válido' })
              }
            })
        }
      }).catch(next)
  }));