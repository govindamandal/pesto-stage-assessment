import { Router } from 'express';
import { addMovie } from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.post('/', addMovie);
movieRouter.post('/', addMovie);

export default movieRouter;