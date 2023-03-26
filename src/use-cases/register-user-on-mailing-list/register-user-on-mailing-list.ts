import { InvalidEmailError, InvalidNameError } from '../../entities/errors';
import { User, UserData } from '../../entities';
import { Either, left, right } from '../../shared';
import { UserRepository } from './ports';

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
