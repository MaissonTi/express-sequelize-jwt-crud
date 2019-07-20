import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AddressController from './app/controllers/AddressController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/address', AddressController.index);
routes.post('/address', AddressController.store);
routes.put('/address/:id', AddressController.update);
routes.delete('/address/:id', AddressController.delete);

export default routes;
