const request = require('supertest');
const app = require('../app');

describe('Menu API', () => {
  it('should return a list of menu items', async () => {
    const response = await request(app).get('/api/menu');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});