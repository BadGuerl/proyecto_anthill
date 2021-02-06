const mongoose = require('mongoose');
const User = require('../models/user.model');



module.exports.register = (req, res, next) => {
  res.render('users/register');
};

module.exports.doRegister = (req, res, next) => {
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
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        user.checkPassword(req.body.password).then((match) => {
          if (match) {
            // req.session.currentUserId = user.id;
            res.redirect('/home');
          } else {
            res.render('users/login', { user: req.body, errors: { password: 'Contraseña no valida' } });
          }
        });
      } else {
        res.render('users/login', { user: req.body, errors: { email: 'Email no valido' } });
      }
    })
    .catch(next);
};

// module.exports.logout = (req, res, next) => {
//   req.session.destroy();
//   res.redirect('/login');
// };

module.exports.userProfile = (req, res, next) => {
  res.render('users/profile');
};
