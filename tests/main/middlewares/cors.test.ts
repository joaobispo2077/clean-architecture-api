import { app } from '@src/main/configs/app';
import request from 'supertest';

describe('Cors middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send();
    });

    await request(app)
      .get('/test_cors')
      .send({ name: 'John Doe' })
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*');
  });
});
