import { Router } from 'express';

import AuthOrCreateUserService from '../services/AuthOrCreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;

    const authOrCreateUser = new AuthOrCreateUserService();

    const user = await authOrCreateUser.execute({ name });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default userRouter;
