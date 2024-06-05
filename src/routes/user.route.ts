import { Router } from 'express';
import { addUser, deleteUser, list, updateUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', list);
userRouter.post('/', addUser);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);

export default userRouter;