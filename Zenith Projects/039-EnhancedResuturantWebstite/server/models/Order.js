const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    customerEmail: String,
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    total: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;