import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupRoutes = (app: Express) => {
  const router = Router();

  app.use('/api');

  // read directories names and import all routes to activate routing
  readdirSync(join(__dirname, 'routes')).forEach(async (file) => {
    console.log('file:', file);
    const module = await import(join(__dirname, 'routes', file));
    module.default(router);
  });
};
