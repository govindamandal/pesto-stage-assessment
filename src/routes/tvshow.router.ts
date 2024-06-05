import { Router } from 'express';
import { addTVShow, deleteTVShow, updateTVShow, list } from '../controllers/tvshow.controller';

const tvshowRouter = Router();

tvshowRouter.get('/', list);
tvshowRouter.post('/', addTVShow);
tvshowRouter.put('/:tvshowId', updateTVShow);
tvshowRouter.delete('/:tvshowId', deleteTVShow);

export default tvshowRouter;