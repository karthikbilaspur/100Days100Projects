const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customerName: String,
  rating: Number,
  review: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;