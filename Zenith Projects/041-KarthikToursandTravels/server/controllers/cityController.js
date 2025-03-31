const City = require('../models/CityModel');
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const Joi = require('joi');
const logger = require('../app').logger;


const citySchema = Joi.object({
  name: Joi.string().required(),
  state: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});


const validateCity = async (city) => {
  try {
    await citySchema.validateAsync(city);
  } catch (err) {
    throw new Error(err.details[0].message);
  }
};


const getCities = async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };
    const cities = await City.paginate({}, options);
    res.json(cities);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.json(city);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addCity = async (req, res) => {
  try {
    await validateCity(req.body);
    const city = new City(req.body);
    await city.save();
    res.json(city);
  } catch (err) {
    logger.error(err);
    res.status(400).json({ error: err.message });
  }
};


const updateCity = async (req, res) => {
  try {
    await validateCity(req.body);
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!city) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.json(city);
    }
  } catch (err) {
    logger.error(err);
    res.status(400).json({ error: err.message });
  }
};


const deleteCity = async (req, res) => {
  try {
    await City.findByIdAndRemove(req.params.id);
    res.json({ message: 'City deleted successfully' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getCities,
  getCity,
  addCity,
  updateCity,
  deleteCity,
  validateCity,
};