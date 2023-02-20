import { UserData } from '../user-data';
import { InMemoryUserRepository } from './in-memory-user-repository';

describe('[Repository] - InMemoryUserRepository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = [];

    const userRepository = new InMemoryUserRepository(users);

    const foundUser = await userRepository.findUserByEmail('any@email.com');
    expect(foundUser).toBeNull();
  });

  it('should return user if it is found after added', async () => {
    const user: UserData = {
      email: 'any@email.com',
      name: 'any name',
    };

    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);

    await userRepository.add(user);

    const foundUser = await userRepository.findUserByEmail(user.email);

    expect(foundUser?.email).toBe(user.email);
  });
});
