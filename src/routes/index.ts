import { Router } from 'express';
import movieRouter from './movie.route';
import listRouter from './list.route';
import tvshowRouter from './tvshow.router';

const router = Router();

router.use('/movie', movieRouter);
router.use('/tvshow', tvshowRouter);
router.use('/mylist', listRouter);

export default router;

