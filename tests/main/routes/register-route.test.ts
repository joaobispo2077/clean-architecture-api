import { app } from '@src/main/configs/app';
import request from 'supertest';

describe('Register route', () => {
  it('should return an account on success', async () => {
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
