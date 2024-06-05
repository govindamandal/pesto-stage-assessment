import { Router } from 'express';
import { addMovie, deleteMovie, list, updateMovie, } from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.get('/', list);
movieRouter.post('/', addMovie);
movieRouter.put('/:movieId', updateMovie);
movieRouter.delete('/:movieId', deleteMovie);

export default movieRouter;