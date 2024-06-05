import { Router } from 'express';
import { addTVShow, deleteTVShow, updateTVShow } from '../controllers/tvshow.controller';

const tvshowRouter = Router();

tvshowRouter.post('/', addTVShow);
tvshowRouter.put('/:tvshowId', updateTVShow);
tvshowRouter.delete('/:tvshowId', deleteTVShow);

export default tvshowRouter;