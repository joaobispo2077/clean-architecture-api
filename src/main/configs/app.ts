import express from 'express';
import { setupMiddlewares } from './middleware';

const app = express();
setupMiddlewares(app);

export { app };
