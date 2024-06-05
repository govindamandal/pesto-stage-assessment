import { Router } from 'express';
import movieRouter from './movie.route';
import listRouter from './list.route';
import tvshowRouter from './tvshow.router';
import userRouter from './user.route';

const router = Router();

router.use('/movie', movieRouter);
router.use('/tvshow', tvshowRouter);
router.use('/mylist', listRouter);
router.use('/user', userRouter);

export default router;

