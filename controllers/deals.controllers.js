const mongoose = require('mongoose');
const createError = require('http-errors');
const Service = require('../models/service.model');
const Deal = require('../models/deal.model');

module.exports.newDeal = (req, res, next) => {
    Service.findById(req.params.serviceId)
        .then(service => {
            if (service) {
                // TODO: hay que mirar si el req.user tiene puntos suficientes para contratar el servicio.
                // en el caso de que no los tenga enviaremos a una pagina de error.
               
                return Deal.create({
                    status: 'Pendiente',
                    service: service.id,
                    serviceOwner: service.owner,
                    interestedUser: req.user.id,
                    antCoins: service.antCoins
                })
                .then(deal => res.redirect(`/services/${service.id}/deals/${deal.id}`))

            } else {
                next(createError(404, 'Service not found'))
            }
        })
        .catch(error => next(error))
}
