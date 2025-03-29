const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const validateMenuItem = (menuItem) => {
  if (!menuItem.name || !menuItem.description || !menuItem.price) {
    throw new Error('Invalid menu item');
  }
};
const redisClient = require('../redisClient');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    // Check if cached data exists
    const cachedData = await redisClient.get('menuItems');
    if (cachedData) {
      // Return cached data
      return res.json(JSON.parse(cachedData));
    }

    // Fetch data from database
    const menuItems = await MenuItem.find();
    // Cache data for 1 hour
    redisClient.set('menuItems', JSON.stringify(menuItems), 'EX', 3600);
    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    validateMenuItem(req.body);
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid request' });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Menu item not found' });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndRemove(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Menu item not found' });
  }
});

module.exports = router;