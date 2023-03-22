import { UserData } from '../../../entities/user-data';

export interface UserRepository {
  add(user: UserData): Promise<void>;
  findUserByEmail(email: string): Promise<UserData | null>;
  findAllUsers(): Promise<UserData[]>;
  exists(user: UserData): Promise<boolean>;
}
