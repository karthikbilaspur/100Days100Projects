const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
});

module.exports = router;