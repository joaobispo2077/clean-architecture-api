import { User } from '.';
import { left } from '../../shared/either';
import { InvalidEmailError } from '../errors/invalid-email-error';

describe('User domain', () => {
  it('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid-email';

    const error = User.create({ name: 'any_name', email: invalidEmail });

    expect(error).toEqual(left(new InvalidEmailError()));
  });
});
