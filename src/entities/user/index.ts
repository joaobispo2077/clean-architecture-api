import { Either, left, right } from '../../shared';
import { Email, Name, UserData } from '..';
import { InvalidEmailError, InvalidNameError } from '../errors';

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
