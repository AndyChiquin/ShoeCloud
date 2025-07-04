const request = require('supertest');
const app = require('../app-export'); 

describe('Health Check - DeleteProduct', () => {
  it('GET / should return 200 and message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'DeleteProduct microservice is running');
  });
});
