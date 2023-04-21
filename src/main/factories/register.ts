import { RegisterUserController } from '@src/controllers';
import { RegisterUserOnMailingListUseCase } from '@src/use-cases/register-user-on-mailing-list';
import { InMemoryUserRepository } from '@tests/use-cases/register-user-on-mailing-list/repository/in-memory-user-repository';

export const makeRegisterUserController = (): RegisterUserController => {
  const userRepository = new InMemoryUserRepository([]);

  const registerUserOnMailingListUseCase = new RegisterUserOnMailingListUseCase(
    userRepository,
  );
  const registerUserController = new RegisterUserController(
    registerUserOnMailingListUseCase,
  );

  return registerUserController;
};