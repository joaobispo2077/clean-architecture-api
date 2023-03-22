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
    const email = `${'l'.repeat(65)}@gmail.com`;

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBe(false);
  });

  it('should not accept domain part larger than 255 chars', () => {
    const email = `locaol-part@${'g'.repeat(256)}mail.com`;

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBe(false);
  });

  it('should not accept strings larger than 320 chars', () => {
    const email = `${'l'.repeat(63)}@${'g'.repeat(20)}mail.co${'m'.repeat(
      240,
    )}`;

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBe(false);
  });

  it('should not accept empty domain part', () => {
    const email = 'john.doe@';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeFalsy();
  });

  it('should not accept email domain with a part larger than 63 chars', () => {
    const email = `john.doe@${'g'.repeat(64)}mail.com`;

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeFalsy();
  });

  it('should not accept empty local part', () => {
    const email = '@gmail.com';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeFalsy();
  });

  it('should not accept invalid chars', () => {
    const email = 'john doe@gmail.com';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeFalsy();
  });

  it('should not accept local part with two dots', () => {
    const email = 'john..doe@gmail.com';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeFalsy();
  });

  it('should not accept local part with ending dot', () => {
    const email = 'john.@gmail.com';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeFalsy();
  });

  it('should not accept an email without an at-sign', () => {
    const email = 'johngmail.com';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeFalsy();
  });

  it('should accept a valid email', () => {
    const email = 'john.doe@gmail.com';

    const isValidEmail = Email.validate(email);

    expect(isValidEmail).toBeTruthy();
  });
});
