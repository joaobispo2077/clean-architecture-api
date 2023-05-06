import { UserData } from '@src/entities';
import { UserRepository } from '@src/use-cases/register-user-on-mailing-list/ports';
import { Collection, WithId, Document } from 'mongodb';
import { MongoDbHelper } from './helpers';

export type MongodbResult<GenericCollection> = WithId<Document> &
  GenericCollection;

export type MongodbListResult<GenericCollection> = Array<
  MongodbResult<GenericCollection>
>;

export class MongoDbUserRepository implements UserRepository {
  private readonly userCollection: Collection =
    MongoDbHelper.getCollection('user');

  async add(user: UserData): Promise<void> {
    const isUserAlreadyExists = await this.exists(user);

    if (!isUserAlreadyExists) {
      await this.userCollection.insertOne(user);
    }
  }

  async findUserByEmail(
    email: string,
  ): Promise<MongodbResult<UserData> | null> {
    const userFound = await this.userCollection.findOne({ email });
    return userFound as MongodbResult<UserData>;
  }

  findAllUsers(): Promise<UserData[]> {
    throw new Error('Method not implemented.');
  }

  async exists(user: UserData): Promise<boolean> {
    const userFound = await this.findUserByEmail(user.email);
    return Boolean(userFound);
  }
}
