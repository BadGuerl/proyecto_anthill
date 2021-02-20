const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const createError = require('http-errors');
const Service = require('../models/service.model');
const Deal = require('../models/deal.model');

module.exports.register = (req, res, next) => {
  res.render('users/register');
};

module.exports.doRegister = (req, res, next) => {
 //buscamos email antes por si ya existe
 
  User.create(req.body)
    .then(user => res.redirect('/home'))
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) { /*Errores de validación (4xx).Los errores 4xx son problema del usuario*/ 
        res.status(400).render('users/register', { 
          user: req.body, /* este user es el objeto que mandamos de vuelta a la vista , por ejemplo si falla el email, este user.email es el que metemos en value*/
          errors: error.errors  /*este objeto errors lo genera mongo y nos devuelve un clave-valor de cada atributo de nuesstro modelo : por ejemplo error.email = "Debes insertar un email",
                                que es lo que tenemos escrito en el atributo require del email */
        });
      } else {
        next(error); /*Error en el BBDD 5xx*/
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render('users/login');
};

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render('users/login', { user: req.body, errors: validations });
    } else {
      req.login(user, error => {
        if (error) next(error)
        else res.redirect('/home')
      })
    }
  })(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
};

module.exports.userProfile = (req, res, next) => {
 
  Deal.find({$or: [{interestedUser: res.locals.currentUser.id}, {serviceOwner: res.locals.currentUser.id}]  })
  .populate('service')
  .populate('serviceOwner')
  .populate('interestedUser')
  .then(deals => {
        res.render('users/profile', {
          deals
        })
      } 
    )
  .catch(error => next(error))
};

module.exports.updateProfile = (req, res, next) => {

  function renderWithErrors(errors) {
    Object.assign(req.user, req.body);
    res.status(400).render('users/profile', {
      user: req.user,
      errors: errors,
    });
  }
  const { password, passwordMatch, name, bio, phoneNumber, nickname} = req.body;
  if (password && password !== passwordMatch) {
    renderWithErrors({ passwordMatch: 'Passwords do not match' })
  } else {
    const updateFields = { name }
    // if (req.file) {
    //   updateFields.avatar = req.file.path;
    // }
    if (password) {
      updateFields.password = password;
    }
    if (bio)
    {
      updateFields.bio = bio;
    }
    if (phoneNumber)
    {
      updateFields.phoneNumber = phoneNumber;
    }
    if (nickname)
    {
      updateFields.nickname = nickname;
    }
    Object.assign(req.user, updateFields);
    req.user.save()
      .then(user => {
        req.login(user, error => {
          if (error) next(error)
          else res.redirect('/profile');
        });
      }).catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          renderWithErrors(error.errors);
        } else {
          next(error);
        }
      })
  }
}

module.exports.visitOtherProfile = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => {
      if (user) {
        Service.find({ owner: userId })
          .then(services => {
            res.render('users/otherProfile', {
              user: user,
              services: services
            });
          })
          .catch(error => next(error))          
      } else {
        next(createError(404, 'User not found'))
      }
    })
    .catch(error => next(error))
}

module.exports.acceptDeal = (req, res, next) => {
    Deal.findById(req.params.dealId)
        .then((newDeal) => {
            if (model.status === 'Pendiente') {
              
            } else {

            }
        })
        .catch(error => next(error))
        console.log(dealList)
}