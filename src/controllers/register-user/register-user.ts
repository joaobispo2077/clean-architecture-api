import { HttpRequest } from '../ports/http-request';
import { HttpResponse } from '../ports/http-response';
import { UserData } from '@src/entities';
import { badRequest, created, serverError } from '../utils/http-helper';
import { MissingParamError } from '@src/entities/errors';
import { UseCase } from '@src/use-cases/ports';

export class RegisterUserController {
  constructor(private readonly registerUserOnMailingListUseCase: UseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
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

      if (result.isRight()) {
        return created(result.value);
      }

      return badRequest(result.value);
    } catch (error) {
      return serverError(error);
    }
  }
}
