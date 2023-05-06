import { MongoDbHelper } from '@src/infra/repositories/helpers';
import request from 'supertest';

describe('Register route', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoDbHelper.disconnect();
  });

  beforeEach(async () => {
    MongoDbHelper.clearCollection('users');
  });

  it('should return an account on success', async () => {
    const module = await import('@src/main/configs/app');
    const { app } = module;
    app.post('test_cors', (request, response) => {
      response.send();
    });

    await request(app)
      .post('/api/register')
      .send({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
      })
      .expect(201);
  });
});
