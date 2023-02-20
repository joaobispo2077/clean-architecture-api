import { UserData } from '../user-data';
import { InMemoryUserRepository } from './in-memory-user-repository';

describe('[Repository] - InMemoryUserRepository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = [];

    const userRepository = new InMemoryUserRepository(users);

    const foundUser = userRepository.findUserByEmail('any@email.com');
    expect(foundUser).toBeNull();
  });
});
