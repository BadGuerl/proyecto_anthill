const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../models/service.model');
require('../models/user.model');



const dealSchema = new Schema({
    estado: {
      type: String,
      enum: ['Pendiente', 'Realizado' , 'Cancelado'],
    },
    /*ID del servicio que se ha contratado*/
    idService:  {
       type: Schema.Types.ObjectId,
       ref: 'Service'
    },
    /*ID del usuario que va a realizar el servicio*/
    /*Este ID yo creo que sobra, porque dentro de Service tenemos al usuario que oferta*/
    idOfferUser:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    /*ID del usuario solicitante del servicio*/
    idApplicant:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  });
  
const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;