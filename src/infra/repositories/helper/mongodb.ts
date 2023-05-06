import { MongoClient, Collection } from 'mongodb';

export const MongoDbHelper = {
  client: null as unknown as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {});
  },
  async disconnect(): Promise<void> {
    this.client.close();
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
  async clearCollection(name: string): Promise<void> {
    this.client.db().collection(name).deleteMany();
  },
};
