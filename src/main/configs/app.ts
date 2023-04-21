import express from 'express';
import { setupMiddlewares } from './middleware';
import { setupRoutes } from './router';

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export { app };
