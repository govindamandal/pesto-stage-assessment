import { Router } from 'express';
import { addUser, deleteUser, updateUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', addUser);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);

export default userRouter;