const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    stars: {
      type: Number,
      enum: [1,2,3,4,5]
    },
    comment: { 
        type: String,
        maxlength: 1000
    },
    idUser: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    idReviewer: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;
