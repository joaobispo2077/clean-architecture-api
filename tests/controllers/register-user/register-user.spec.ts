import { HttpRequest } from '@src/controllers/ports/http-request';
import { HttpResponse } from '@src/controllers/ports/http-response';
import { RegisterUserController } from '@src/controllers/register-user/register-user';
import { UserData } from '@src/entities';
import {
  InvalidEmailError,
  InvalidNameError,
  MissingParamError,
} from '@src/entities/errors';
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

  it('should return status code 400 when request contains an invalid user name', async () => {
    const request: HttpRequest = {
      body: {
        name: 'J',
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

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(InvalidNameError);
  });

  it('should return status code 400 when request contains an invalid user e-mail', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john',
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

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(InvalidEmailError);
  });

  it('should return status code 400 when request contains is missing user name', async () => {
    const request: HttpRequest = {
      body: {
        email: 'john',
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

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toBe('Missing parameter: name');
  });

  it('should return status code 400 when request contains is missing user e-mail', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
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

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toBe('Missing parameter: email');
  });

  it('should return status code 400 when request contains is missing user e-mail & name', async () => {
    const request: HttpRequest = {
      body: {},
    };

    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const registerUserOnMailingListUseCase =
      new RegisterUserOnMailingListUseCase(userRepository);
    const registerUserController = new RegisterUserController(
      registerUserOnMailingListUseCase,
    );
    const response: HttpResponse = await registerUserController.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toBe(
      'Missing parameter: name,email',
    );
  });
});
