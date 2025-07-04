const request = require('supertest');
const app = require('../app-export'); // usas el nuevo archivo sin levantar servidor

describe('Health Check', () => {
  it('GET / should return 200 and message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'CreateProduct microservice is running');
  });
});
