import { Either, left, right } from '@src/shared';
import { Email, Name, UserData } from '@src/entities';
import { InvalidEmailError, InvalidNameError } from '@src/entities/errors';

export class User {
  public readonly email: Email;
  public readonly name: Name;

  constructor({ email, name }: { name: Name; email: Email }) {
    this.email = email;
    this.name = name;
  }

  static create(
    userData: UserData,
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const name: Name = nameOrError.value as Name;
    const email: Email = emailOrError.value as Email;

    return right(
      new User({
        name,
        email,
      }),
    );
  }
}
