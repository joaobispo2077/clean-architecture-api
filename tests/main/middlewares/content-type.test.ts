import { MongoDbHelper } from '@src/infra/repositories/helpers';
import request from 'supertest';

describe('Content type middleware', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoDbHelper.disconnect();
  });

  beforeEach(async () => {
    MongoDbHelper.clearCollection('users');
  });

  it('should return default content type as json', async () => {
    const module = await import('@src/main/configs/app');
    const { app } = module;

    app.get('/test_content_type', (req, res) => {
      res.send('');
    });

    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  it('should return xml content type when forced', async () => {
    const module = await import('@src/main/configs/app');
    const { app } = module;

    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});
