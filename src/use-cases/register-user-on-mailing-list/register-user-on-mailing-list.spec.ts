import { InvalidEmailError } from '../../entities/errors/invalid-email-error';
import { InvalidNameError } from '../../entities/errors/invalid-name-error';
import { UserData } from '../../entities/user-data';
import { left } from '../../shared/either';
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

  it('should not add user with invalid e-mail to mailing list', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const useCaseRegisterUseOnMailingList: RegisterUserOnMailingListUseCase =
      new RegisterUserOnMailingListUseCase(userRepository);
    const name = 'Do';
    const invalidEmail = 'john..com';
    const response = await useCaseRegisterUseOnMailingList.execute({
      name,
      email: invalidEmail,
    });
    const user = await userRepository.findUserByEmail(invalidEmail);

    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidEmailError()));
  });

  it('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const useCaseRegisterUseOnMailingList: RegisterUserOnMailingListUseCase =
      new RegisterUserOnMailingListUseCase(userRepository);
    const invalidName = '';
    const email = 'john.doe@gmail.com';
    const response = await useCaseRegisterUseOnMailingList.execute({
      name: invalidName,
      email,
    });
    const user = await userRepository.findUserByEmail(email);

    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidNameError()));
  });
});
