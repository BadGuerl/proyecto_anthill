const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*Con la información de este modelo de BBDD filtraremos por palabras para encontrar ofertas*/
const keyWordsSchema = new Schema({
    word: {
      type: String,
      unique: true,
      required: true
    },
    /*Cuando le ofrezcamos la tabla con checks para que elija palabras clave, las mostraremos segun su valor
    por ejemplo: jardinería será de tipo 1(muy común)*/ 
    value: { 
        type: number,
        enum: [1,2,3]
    }
  });
const keyWords = mongoose.model('keyWords', keyWordsSchema);
module.exports = keyWords;