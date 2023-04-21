import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route';
import { makeRegisterUserController } from '@src/main/factories/register';

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()));
};
