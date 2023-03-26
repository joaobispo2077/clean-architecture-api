export class InvalidNameError extends Error {
  public readonly name = 'InvalidName';

  constructor(message: string) {
    super(`Invalid name: ${message}.`);
  }
}
