import { Schema, model } from 'mongoose';
import { Genres } from '../interface/genre';
import { Movie } from '../interface/all.interface';

const movieSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: [{ type: String, enum: Genres, required: true }],
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    actors: [{ type: String, required: true }]
});

const MovieModel = model<Movie>('movie', movieSchema);

export default MovieModel;