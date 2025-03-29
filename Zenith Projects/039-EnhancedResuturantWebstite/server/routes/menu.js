const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = mongoose.model('Menu');

router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});

router.post('/', async (req, res) => {
    try {
        const menuItem = new Menu(req.body);
        await menuItem.save();
        res.json(menuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating menu item' });
    }
});

module.exports = router;