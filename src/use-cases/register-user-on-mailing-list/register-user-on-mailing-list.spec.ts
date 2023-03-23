import { UserData } from '../../entities/user-data';
import { UserRepository } from './ports/user-repository';
import { RegisterUserOnMailingListUseCase } from './register-user-on-mailing-list';
import { InMemoryUserRepository } from './repository/in-memory-user-repository';

describe('[UseCase] - Register user on mailing list', () => {
  it('should add user with complete data to mailing list', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const useCaseRegisterUseOnMailingList: RegisterUserOnMailingListUseCase =
      new RegisterUserOnMailingListUseCase(userRepository);
    const name = 'John Doe';
    const email = 'john.doe@gmail.com';
    const response = await useCaseRegisterUseOnMailingList.execute({
      name,
      email,
    });
    const user = await userRepository.findUserByEmail(email);
    expect(user?.name).toBe(name);
    expect(response.value.name).toBe(name);
  });
});
