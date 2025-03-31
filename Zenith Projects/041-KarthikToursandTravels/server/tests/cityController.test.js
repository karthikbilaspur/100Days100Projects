// cityController.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const City = require('../models/cityModel');
const cityController = require('../controllers/cityController');

describe('City Controller', () => {
  beforeEach(async () => {
    await City.deleteMany({});
  });

  afterEach(async () => {
    await City.deleteMany({});
  });

  it('should add a new city', async () => {
    const city = { name: 'New City', state: 'New State' };
    const response = await cityController.addCity(city);
    expect(response).toHaveProperty('_id');
  });

  it('should get all cities', async () => {
    const city1 = { name: 'City 1', state: 'State 1' };
    const city2 = { name: 'City 2', state: 'State 2' };
    await cityController.addCity(city1);
    await cityController.addCity(city2);
    const response = await cityController.getCities();
    expect(response).toHaveLength(2);
  });
});