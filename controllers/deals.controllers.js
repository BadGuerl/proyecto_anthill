const mongoose = require('mongoose');
const createError = require('http-errors');
const Service = require('../models/service.model');
const Deal = require('../models/deal.model');
const User = require('../models/user.model');

module.exports.newDeal = (req, res, next) => {
    Service.findById(req.params.serviceId)
        .then(service => {
            console.log(req.user.balance);
            console.log(service.antCoins);
            if (service) {
                // TODO: hay que mirar si el req.user tiene puntos suficientes para contratar el servicio.
                // en el caso de que no los tenga enviaremos a una pagina de error.
                if (req.user.balance >= service.antCoins) {
                    return Deal.create({
                    status: 'Pendiente',
                    service: service.id,
                    serviceOwner: service.owner,
                    interestedUser: req.user.id,
                    antCoins: service.antCoins
                })
                .then(deal => {
                    if (deal) {
                    res.redirect('/profile')}
                })
                .catch(createError(403, 'No se ha podido crear el trato'))
                } else {
                    next(createError(403, 'No tienes suficientes Antcoins'))// TODO mostrar un alert de que no tiene monedas
                }
            } else {
                next(createError(404, 'Este servicio no está disponible'))
            }
        })
        .catch(error => next(error))
}

module.exports.acceptDeal = (req, res, next) => {
   const dealId = req.params.id;
   req.body.status = 'Aceptado';
   Deal.findByIdAndUpdate(dealId, { $set: req.body }, { runValidators: true })
    .then((deal) => {
      if (deal) {
        res.redirect('/profile');
      } else {
        next(createError(404, 'Este trato no existe'));
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const deal = req.body;
        deal.id = req.params.id;
        res.render('/profile', {
          errors: error.errors,
          deal: deal,
        });
      } else {
        next(error);
      }
    });
}

module.exports.cancelDeal = (req, res, next) => {
    const dealId = req.params.id;
    req.body.status = 'Cancelado';
    Deal.findByIdAndUpdate(dealId, { $set: req.body }, { runValidators: true })
     .then((deal) => {
       if (deal) {
         res.redirect('/profile');
       } else {
         next(createError(404, 'Este trato no existe'));
       }
     })
     .catch((error) => {
       if (error instanceof mongoose.Error.ValidationError) {
         const deal = req.body;
         deal.id = req.params.id;
         res.render('/profile', {
           errors: error.errors,
           deal: deal,
         });
       } else {
         next(error);
       }
     });
 }
 
 module.exports.endDeal = (req, res, next) => {
    const dealId = req.params.id;
    req.body.status = 'Finalizado'
    Deal.findByIdAndUpdate(dealId, { $set: req.body }, { runValidators: true })
     .then((deal) => {
       if (deal) {
         res.redirect('/profile');
        //  res.render('/otherProfile');
       } else {
         next(createError(404, 'Este trato no existe'));
       }
     })
     .catch((error) => {
       if (error instanceof mongoose.Error.ValidationError) {
         const deal = req.body;
         deal.id = req.params.id;
         res.render('/profile', {
           errors: error.errors,
           deal: deal,
         });
       } else {
         next(error);
       }
     });
 }

 module.exports.payDeal = (req, res, next) => {
  const dealId = req.params.id;
    req.body.status = 'Pagado'
    Deal.findByIdAndUpdate(dealId, { $set: req.body }, { runValidators: true })
     .then((deal) => {
       if (deal) {
         User.findByIdAndUpdate(deal.interestedUser, {$inc:{balance: deal.antCoins*(-1)}},{ runValidators: true })
         .then(interestedUser => {
           User.findByIdAndUpdate(deal.serviceOwner,{$inc:{balance: deal.antCoins}},{ runValidators: true })
           .then(owner=>{             
             res.redirect('/profile');
           });
          
         })
        //  res.render('/otherProfile');
       } else {
         next(createError(404, 'Este trato no existe'));
       }
     })
     .catch((error) => {
       if (error instanceof mongoose.Error.ValidationError) {
         const deal = req.body;
         deal.id = req.params.id;
         res.render('/profile', {
           errors: error.errors,
           deal: deal,
         });
       } else {
         next(error);
       }
     });
 }