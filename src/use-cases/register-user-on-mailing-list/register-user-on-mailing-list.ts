import { InvalidEmailError, InvalidNameError } from '@src/entities/errors';
import { User, UserData } from '@src/entities';
import { Either, left, right } from '@src/shared';
import { UserRepository } from './ports';
import { UseCase } from '../ports';

export class RegisterUserOnMailingListUseCase implements UseCase {
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
