import { Either, left, right } from '../../shared/either';
import { Email } from '../email';
import { InvalidEmailError } from '../errors/invalid-email-error';
import { InvalidNameError } from '../errors/invalid-name-error';
import { Name } from '../name';
import { UserData } from '../user-data';

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
      return left(new InvalidNameError());
    }

    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError());
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
