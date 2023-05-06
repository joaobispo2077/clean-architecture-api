import { MongoDbHelper } from '@src/infra/repositories/helpers';
import request from 'supertest';

describe('Body parser middleware', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoDbHelper.disconnect();
  });

  beforeEach(async () => {
    MongoDbHelper.clearCollection('users');
  });

  it('should parse body as json', async () => {
    const module = await import('@src/main/configs/app');
    const { app } = module;

    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'John Doe' })
      .expect({ name: 'John Doe' });
  });
});
