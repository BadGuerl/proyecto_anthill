module.exports.offersList = (req, res, next) => {
    res.render ('services/offers');
}

module.exports.newOffer = (req, res, next) => {
    res.render ('services/new');
}


module.exports.addService = (req, res, next) => {   
     Service.create(req.body)
       .then(user => res.redirect('/services/offers'))
       .catch(error => {
         if (error instanceof mongoose.Error.ValidationError) { /*Errores de validación (4xx).Los errores 4xx son problema del usuario*/ 
           res.status(400).render('/services/new', { 
             user: req.body, /* este user es el objeto que mandamos de vuelta a la vista , por ejemplo si falla el email, este user.email es el que metemos en value*/
             errors: error.errors  /*este objeto errors lo genera mongo y nos devuelve un clave-valor de cada atributo de nuesstro modelo : por ejemplo error.email = "Debes insertar un email",
                                   que es lo que tenemos escrito en el atributo require del email */
           });
         } else {
           next(error); /*Error en el BBDD 5xx*/
         }
       });
};