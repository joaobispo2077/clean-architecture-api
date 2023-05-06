import { MongoDbUserRepository } from '@src/infra/repositories';
import { MongoDbHelper } from '@src/infra/repositories/helpers';

describe('[repository] - MongoDb User', () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
  };

  beforeAll(async () => {
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

  it('should retrieve all users from collection', async () => {
    const usersRepository = new MongoDbUserRepository();
    await usersRepository.add(user);
    await usersRepository.add({
      name: 'example',
      email: 'example@example.com',
    });

    const usersFound = await usersRepository.findAllUsers();
    expect(usersFound[0]).toEqual(expect.objectContaining(user));
    expect(usersFound[1]).toEqual(
      expect.objectContaining({
        name: 'example',
        email: 'example@example.com',
      }),
    );
  });
});
