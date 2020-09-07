import { Router } from 'express';
import userRouter from './user.routes';
import notificationRouter from './notification.routes';

const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/notification', notificationRouter);

export default rootRouter;
