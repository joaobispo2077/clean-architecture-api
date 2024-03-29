import { Either, left, right } from '@src/shared';
import { InvalidNameError } from '@src/entities/errors';

export class Name {
  public readonly value: string;

  private constructor(name: string) {
    this.value = name;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (Name.validate(name)) {
      return right(new Name(name));
    }

    return left(new InvalidNameError(name));
  }

  static validate(name: string): boolean {
    if (!name) {
      return false;
    }

    if (name.trim().length < 2) {
      return false;
    }

    if (name.trim().length > 256) {
      return false;
    }

    return true;
  }
}
