import { UserRepository } from '../ports/user-repository';
import { UserData } from '../user-data';

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

  findAllUsers(): Promise<UserData[]> {
    throw new Error('Method not implemented.');
  }

  async exists(user: UserData): Promise<boolean> {
    const foundUser = await this.findUserByEmail(user.email);

    if (foundUser === null) {
      return false;
    }

    return true;
  }
}
