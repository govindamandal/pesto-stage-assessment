import { Router } from 'express';
import { addToList, removeFromList, listMyItems } from '../controllers/list.controller';

const listRouter = Router();

listRouter.post('/', addToList);
listRouter.delete('/:contentId', removeFromList);
listRouter.get('/', listMyItems);

export default listRouter;