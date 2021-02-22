const mongoose = require('mongoose');
const Service = require('../models/service.model');

module.exports.offersList = (req, res, next) => {
  Service.find().populate("owner")
    .then((services) => res.render('services/offers', {
      services
    })) /*ruta en el árbol del proyecto*/
    .catch(next);
}


module.exports.newOffer = (req, res, next) => {
  res.render('services/new');
}

module.exports.addService = (req, res, next) => {   
    // req.body.owner = res.locals.currentUser.id;
    const newService = {
      ...req.body,  /* equivale a name: Ana, nickname: anaurri */
      owner: res.locals.currentUser.id 
    }
    Service.create(newService)
       .then(user => res.redirect('/offers')) /*Es ruta en navegador. Va a ir a routes/config a buscar el /offers y ahi si q hará un render('services/offers')*/
       .catch(error => {
         console.log(error)
         if (error instanceof mongoose.Error.ValidationError) { /*Errores de validación (4xx).Los errores 4xx son problema del usuario*/ 
           res.status(400).render('services/new', { 
             user: req.body, /* este user es el objeto que mandamos de vuelta a la vista , por ejemplo si falla el email, este user.email es el que metemos en value*/
             errors: error.errors  /*este objeto errors lo genera mongo y nos devuelve un clave-valor de cada atributo de nuesstro modelo : por ejemplo error.email = "Debes insertar un email",
                                   que es lo que tenemos escrito en el atributo require del email */
           });
         } else {
           next(error); /*Error en el BBDD 5xx*/
         }
       });
};

module.exports.deleteService = (req, res, next) => {
  Service.findById(req.params.id) /* req.params -->request que viene en el path de la url (req.query sería en la url despues de '?' y req.body , va en el cuerpo*/
    .then((service) => {
      if (service && service.owner == res.locals.currentUser.id) {
        Service.findByIdAndDelete(req.params.id)
          .then((service) => {
            if (service) {
              res.redirect('/offers');
            }
          });
      } else {
        next(createError(404, 'Service does not exists'));
      }
    })
    .catch(next);
};

module.exports.searchService = (req, res, next) => {
  const keyWord = req.body.keyWord;
  const keyRE = new RegExp(keyWord , "i"); /*Creamos expresion regular: "/palabra/" . La "i" es el ignorecase*/
  Service.find({$or: [{title: keyRE}, {nickname: keyRE}, {description: keyRE}]  })
  // Service.find({
  //     title: keyRE
  //   })
    .populate("owner")
    .then((services) => {  /* se tiene que llamar igual que en la variable de hbs */
      res.render('services/offers', { services } )   
    })
    .catch(next);
}

module.exports.viewConversor = (req, res, next) => {
  res.render('services/conversor')   

}