import { UserRepository } from '../../../../src/use-cases/register-user-on-mailing-list/ports/user-repository';
import { UserData } from '../../../../src/entities/user-data';

export class InMemoryUserRepository implements UserRepository {
  constructor(private readonly users: UserData[]) {}

  async add(user: UserData): Promise<void> {
    const isUserAlreadyExists = await this.exists(user);

    if (!isUserAlreadyExists) {
      this.users.push(user);
    }
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    const user = this.users.find((user) => user.email === email);

    if (user) {
      return user;
    }

    return null;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.users;
  }

  async exists(user: UserData): Promise<boolean> {
    const foundUser = await this.findUserByEmail(user.email);

    if (foundUser === null) {
      return false;
    }

    return true;
  }
}
