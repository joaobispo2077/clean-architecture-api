import { UserRepository } from '../ports/user-repository';
import { UserData } from '../user-data';

export class InMemoryUserRepository implements UserRepository {
  constructor(private readonly users: UserData[]) {}

  add(user: UserData): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    return null;
  }

  findAllUsers(): Promise<UserData[]> {
    throw new Error('Method not implemented.');
  }

  exists(user: UserData): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
