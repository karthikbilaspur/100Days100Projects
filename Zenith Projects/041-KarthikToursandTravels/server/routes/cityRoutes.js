const express = require('express');
const router = express.Router();
const City = require('../models/CityModel');
const cityController = require('../controllers/cityController');
const { authenticate, authorize } = require('../auth');

router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cities' });
  }
});

router.get('/cities/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    res.json(city);
  } catch (err) {
    res.status(404).json({ message: 'City not found' });
  }
});

router.post('/cities', cityController.addCity);
router.put('/cities/:id', cityController.updateCity);
router.delete('/cities/:id', cityController.deleteCity);

router.get('/cities', authenticate, cityController.getCities);
router.get('/cities/:id', authenticate, cityController.getCity);
router.post('/cities', authenticate, authorize, cityController.addCity);
router.put('/cities/:id', authenticate, authorize, cityController.updateCity);
router.delete('/cities/:id', authenticate, authorize, cityController.deleteCity);



module.exports = router;