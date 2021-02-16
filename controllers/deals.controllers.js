const mongoose = require('mongoose');
const createError = require('http-errors');
const Service = require('../models/service.model');
const Deal = require('../models/deal.model');

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
                .then(deal => res.redirect('/profile'))
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

// module.exports.closeDeal = (req, res, next) => {

//     Deal.findById(req.params.dealId)
//         .then((deal => {
//             if (status) {// si el owner acepta el deal, el status cambia a 'realizado', y si no a 'cancelado'
              
//         })
//         .catch(error => next(error))
//   }