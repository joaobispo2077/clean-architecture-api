import { RegisterUserOnMailingListUseCase } from '@src/use-cases/register-user-on-mailing-list';
import { HttpRequest } from '../ports/http-request';
import { HttpResponse } from '../ports/http-response';
import { UserData } from '@src/entities';
import { created } from '../utils/http-helper';

export class RegisterUserController {
  constructor(
    private readonly registerUserOnMailingListUseCase: RegisterUserOnMailingListUseCase,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body;
    const result = await this.registerUserOnMailingListUseCase.execute(
      userData,
    );

    if (result.isRight()) {
      return created(result.value);
    }

    return created({});
  }
}
