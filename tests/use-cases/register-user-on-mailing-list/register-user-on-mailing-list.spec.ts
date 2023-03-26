import { InvalidEmailError } from '../../../src/entities/errors/invalid-email-error';
import { InvalidNameError } from '../../../src/entities/errors/invalid-name-error';
import { UserData } from '../../../src/entities/user-data';
import { UserRepository } from '../../../src/use-cases/register-user-on-mailing-list/ports/user-repository';
import { RegisterUserOnMailingListUseCase } from '../../../src/use-cases/register-user-on-mailing-list/register-user-on-mailing-list';
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
    expect(response.value).toBeInstanceOf(InvalidEmailError);
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
    expect(response.value).toBeInstanceOf(InvalidNameError);
  });
});
