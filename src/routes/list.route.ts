import { Router } from 'express';
import { addToList, removeFromList, listMyItems } from '../controllers/list.controller';

const listRouter = Router();

listRouter.post('/mylist', addToList);
listRouter.delete('/mylist/:contentId', removeFromList);
listRouter.get('/mylist', listMyItems);

export default listRouter;