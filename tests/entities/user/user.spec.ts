import { User } from '../../../src/entities';
import {
  InvalidEmailError,
  InvalidNameError,
} from '../../../src/entities/errors';

describe('User domain', () => {
  it('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid-email';

    const error = User.create({ name: 'any_name', email: invalidEmail });

    expect(error.value).toBeInstanceOf(InvalidEmailError);
  });

  it('should not create user with invalid name (too few chars)', () => {
    const invalidName = 'O          ';
    const error = User.create({
      name: invalidName,
      email: 'john.doe@gmail.com',
    });

    expect(error.value).toBeInstanceOf(InvalidNameError);
  });

  it('should not create user with invalid name (too many chars)', () => {
    const invalidName = 'AO'.repeat(256);
    const error = User.create({
      name: invalidName,
      email: 'john.doe@gmail.com',
    });

    expect(error.value).toBeInstanceOf(InvalidNameError);
  });

  it('should create user with valid data', () => {
    const validName = 'John Doe';
    const validEmail = 'john.doe@gmail.com';
    const user = User.create({
      name: validName,
      email: validEmail,
    }).value as User;

    expect(user.name.value).toBe(validName);
    expect(user.email.value).toBe(validEmail);
  });
});
