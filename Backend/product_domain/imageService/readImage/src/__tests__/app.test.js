const request = require('supertest');
const app = require('../app-export');

describe('Health Check - ReadImage', () => {
  it('GET / should return 200 and correct message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'ReadImage microservice is running');
  });
});
