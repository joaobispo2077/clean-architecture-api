import { RegisterUserController } from '@src/controllers';
import { MongoDbUserRepository } from '@src/infra/repositories';
import { RegisterUserOnMailingListUseCase } from '@src/use-cases/register-user-on-mailing-list';

export const makeRegisterUserController = (): RegisterUserController => {
  const userRepository = new MongoDbUserRepository();

  const registerUserOnMailingListUseCase = new RegisterUserOnMailingListUseCase(
    userRepository,
  );
  const registerUserController = new RegisterUserController(
    registerUserOnMailingListUseCase,
  );

  return registerUserController;
};
