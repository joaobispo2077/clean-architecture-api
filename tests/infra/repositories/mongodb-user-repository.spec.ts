import { MongoDbUserRepository } from '@src/infra/repositories';
import { MongoDbHelper } from '@src/infra/repositories/helpers';

describe('[repository] - MongoDb User', () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
  };
  beforeAll(async () => {
    console.debug('[repository] - MongoDb User, uri:', process.env.MONGO_URL);
    await MongoDbHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoDbHelper.disconnect();
  });

  beforeEach(async () => {
    MongoDbHelper.clearCollection('users');
  });

  it('should exists user after adding to collection', async () => {
    const usersRepository = new MongoDbUserRepository();
    await usersRepository.add(user);

    const userFound = await usersRepository.findUserByEmail(user.email);
    expect(userFound?.name).toBe(user.name);
  });
});
