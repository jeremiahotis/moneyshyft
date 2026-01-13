import request from 'supertest';

const app = require('../app').default;

describe('GET /health', () => {
  it('returns status ok payload', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ status: 'ok' }));
  });
});
