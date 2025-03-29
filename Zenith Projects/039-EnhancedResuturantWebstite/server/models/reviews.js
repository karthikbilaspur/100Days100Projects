const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customerName: String,
  rating: Number,
  review: String,
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;