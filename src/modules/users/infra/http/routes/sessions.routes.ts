import { Router } from 'express';

import SessionsController from '../controllers/SessionsControllers';

const sessionsRouter = Router();
const sessionsContoller = new SessionsController();

sessionsRouter.post('/', sessionsContoller.create);

export default sessionsRouter;
