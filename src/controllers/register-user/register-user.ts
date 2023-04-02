import { RegisterUserOnMailingListUseCase } from '@src/use-cases/register-user-on-mailing-list';
import { HttpRequest } from '../ports/http-request';
import { HttpResponse } from '../ports/http-response';
import { UserData } from '@src/entities';
import { badRequest, created } from '../utils/http-helper';
import { MissingParamError } from '@src/entities/errors';

export class RegisterUserController {
  constructor(
    private readonly registerUserOnMailingListUseCase: RegisterUserOnMailingListUseCase,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body;

    const requiredParameters = ['name', 'email'];
    const missingParameters = requiredParameters.filter(
      (param) => !userData[param as keyof UserData],
    );

    if (missingParameters.length > 0) {
      return badRequest(new MissingParamError(missingParameters.join(',')));
    }

    const result = await this.registerUserOnMailingListUseCase.execute(
      userData,
    );

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    if (result.isRight()) {
      return created(result.value);
    }

    return created({});
  }
}
