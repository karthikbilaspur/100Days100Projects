// cityModel.js
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  state: String,
  lat: Number,
  lng: Number,
  placesToVisit: [{ type: String }],
  images: [{ type: String }],
  reviews: [{ type: String }],
  ratings: [{ type: Number }]
});

citySchema.index({ name: 1 });
citySchema.index({ state: 1 });
citySchema.index({ lat: 1, lng: 1 });

module.exports = mongoose.model('City', citySchema);