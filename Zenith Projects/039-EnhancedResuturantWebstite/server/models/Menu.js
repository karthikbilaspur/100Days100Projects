const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;