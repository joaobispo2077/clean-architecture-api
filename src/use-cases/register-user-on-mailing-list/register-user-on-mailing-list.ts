import { InvalidEmailError } from '../../entities/errors/invalid-email-error';
import { InvalidNameError } from '../../entities/errors/invalid-name-error';
import { User } from '../../entities/user';
import { UserData } from '../../entities/user-data';
import { Either, left, right } from '../../shared/either';
import { UserRepository } from './ports/user-repository';

export class RegisterUserOnMailingListUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userData: UserData,
  ): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(userData);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const userAlreadyExists = await this.userRepository.exists(userData);
    if (!userAlreadyExists) {
      await this.userRepository.add(userData);
    }

    return right(userData);
  }
}
