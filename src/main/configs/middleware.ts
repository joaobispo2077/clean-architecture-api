import { Express } from 'express';
import { contentType, cors, bodyParser } from './middlewares';

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
