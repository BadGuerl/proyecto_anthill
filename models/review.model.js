const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    stars: {
      type: number,
      enum: [1,2,3,4,5]
    },
    comment: { 
        type: String,
        maxlength: 200
    },
    idUser: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  });
const review = mongoose.model('review', reviewSchema);
module.exports = review;