import { HttpRequest } from '@src/controllers/ports/http-request';
import { HttpResponse } from '@src/controllers/ports/http-response';
import { RegisterUserController } from '@src/controllers/register-user/register-user';
import { UserData } from '@src/entities';
import { RegisterUserOnMailingListUseCase } from '@src/use-cases/register-user-on-mailing-list';
import { UserRepository } from '@src/use-cases/register-user-on-mailing-list/ports';
import { InMemoryUserRepository } from '@tests/use-cases/register-user-on-mailing-list/repository/in-memory-user-repository';

describe('Register user web controller', () => {
  it('should return status code 201 when request contains a valid user', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
      },
    };

    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const registerUserOnMailingListUseCase =
      new RegisterUserOnMailingListUseCase(userRepository);
    const registerUserController = new RegisterUserController(
      registerUserOnMailingListUseCase,
    );
    const response: HttpResponse = await registerUserController.handle(request);

    expect(response.statusCode).toBe(201);
  });
});
