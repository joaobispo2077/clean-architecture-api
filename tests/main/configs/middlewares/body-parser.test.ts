import { app } from '@src/main/configs/app';
import request from 'supertest';

describe('Body parser middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'John Doe' })
      .expect({ name: 'John Doe' });
  });
});
