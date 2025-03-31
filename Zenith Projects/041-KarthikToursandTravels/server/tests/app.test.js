// app.test.js
const request = require('supertest');
const app = require('../app');

describe('App', () => {
  it('should get all cities', async () => {
    const response = await request(app).get('/api/cities');
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveLength(2);
  });

  it('should add a new city', async () => {
    const city = { name: 'New City', state: 'New State' };
    const response = await request(app).post('/api/cities').send(city);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('_id');
  });
});