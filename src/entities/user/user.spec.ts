import { User } from '.';
import { left } from '../../shared/either';
import { InvalidEmailError } from '../errors/invalid-email-error';
import { InvalidNameError } from '../errors/invalid-name-error';

describe('User domain', () => {
  it('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid-email';

    const error = User.create({ name: 'any_name', email: invalidEmail });

    expect(error).toEqual(left(new InvalidEmailError()));
  });

  it('should not create user with invalid name (too few chars)', () => {
    const invalidName = 'O          ';
    const error = User.create({
      name: invalidName,
      email: 'john.doe@gmail.com',
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });

  it('should not create user with invalid name (too many chars)', () => {
    const invalidName = 'O'.repeat(256);
    const error = User.create({
      name: invalidName,
      email: 'john.doe@gmail.com',
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });
});
