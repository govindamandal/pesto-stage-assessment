import { Schema, model } from 'mongoose';
import { Genres } from '../interface/genre';
import { TVShow } from '../interface/all.interface';

const tvShowSchema: Schema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: [{ type: String, enum: Genres, required: true }],
    episodes: [{
        episodeNumber: { type: Number, required: true },
        seasonNumber: { type: Number, required: true },
        releaseDate: { type: Date, required: true },
        director: { type: String, required: true },
        actors: [{ type: String, required: true }]
    }]
});

const TvshowModel = model<TVShow>('tvshow', tvShowSchema);

export default TvshowModel;