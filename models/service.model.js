const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../models/user.model');


const serviceSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 500
    },
    /*ID del usuario que va a realizar el servicio*/
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    antCoins: {
        type: Number,
        required: 'El coste del servicio es obligatorio. Si necesitas ayuda con los precios, visita nuestra tabla de equivalencias'
    },
    /*IDs de las palabras clave con las que se filtrará.Fichero de constantes (.js) mejor , con module exports. Y lo cargo en el res.locals */
    keyWords:[{
        type: String
    }]
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
