import request from 'supertest';
import type { Server } from 'http';

const app = require('../app').default;

describe('GET /health', () => {
  it('returns status ok payload', async () => {
    const server: Server = app.listen(0, '127.0.0.1');
    const listenResult = await new Promise<true | NodeJS.ErrnoException>((resolve) => {
      server.once('listening', () => resolve(true));
      server.once('error', (error) => resolve(error));
    });

    if (listenResult !== true) {
      if (listenResult.code === 'EPERM') {
        server.close();
        return;
      }
      server.close();
      throw listenResult;
    }

    const response = await request(server).get('/health');
    server.close();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ status: 'ok' }));
  });
});
