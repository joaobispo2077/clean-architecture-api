import { Email } from '.';

describe('Email validation', () => {
  it('should not accept null strings', () => {
    const email = null;

    const isValidEmail = Email.validate(email as unknown as string);

    expect(isValidEmail).toBe(false);
  });

  it('should not accept empty strings', () => {
    const email = '';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBe(false);
  });

  it('should not accept local part larger than 64 chars', () => {
    const email = `${'l'.repeat(65)}@gmai.com`;

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBe(false);
  });

  it('should  accept a valid email', () => {
    const email = 'john.doe@gmail.com';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeTruthy();
  });
});
