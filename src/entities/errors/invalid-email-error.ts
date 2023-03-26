export class InvalidEmailError extends Error {
  public readonly name = 'InvalidEmail';

  constructor(message: string) {
    super(`Invalid email: ${message}.`);
  }
}
