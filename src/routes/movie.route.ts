import { Router } from 'express';
import { addMovie, deleteMovie, updateMovie, } from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.post('/', addMovie);
movieRouter.put('/:movieId', updateMovie);
movieRouter.delete('/:movieId', deleteMovie);

export default movieRouter;