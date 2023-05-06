import { MongoDbHelper } from '@src/infra/repositories/helpers';
import request from 'supertest';

describe('Cors middleware', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoDbHelper.disconnect();
  });

  beforeEach(async () => {
    MongoDbHelper.clearCollection('users');
  });

  it('should enable CORS', async () => {
    const module = await import('@src/main/configs/app');
    const { app } = module;

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
