const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../models/service.model');
require('../models/user.model');


const dealSchema = new Schema({
    status: {
      type: String,
<<<<<<< HEAD
      enum: ['Pendiente', 'Aceptado', 'Realizado', 'Cancelado', 'Finalizado', 'Pagado'],
=======
      enum: ['Pendiente', 'Aceptado', 'Realizado' , 'Cancelado', 'Finalizado'],
>>>>>>> 1aa0b93602ce082121f5b37df52a70a8395426dd
    },
    /*ID del servicio que se ha contratado*/
    service:  {
       type: Schema.Types.ObjectId,
       ref: 'Service'
    },
    /*ID del usuario que va a realizar el servicio*/
    /*Este ID yo creo que sobra, porque dentro de Service tenemos al usuario que oferta*/
    serviceOwner:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    /*ID del usuario solicitante del servicio*/
    interestedUser:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    antCoins: {
      type: Number,
      required: true
    }
  });
  
const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;