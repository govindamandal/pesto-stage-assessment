import { Router } from 'express';
import movieRouter from './movie.route';
import listRouter from './list.route';

const router = Router();

router.use('/movie', movieRouter);
router.use('/mylist', listRouter);

export default router;

