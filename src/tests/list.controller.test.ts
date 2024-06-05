import request from 'supertest';
import { app } from '../index';  // Adjust the path to your Express app
import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import MovieModel from '../models/movie.model';
import TvshowModel from '../models/tvshow.model';
import { User, Movie, TVShow } from '../interface/all.interface';

import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/stage';

beforeAll(async () => {
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('My List API', () => {
    let userId: mongoose.Types.ObjectId;
    let movieId: mongoose.Types.ObjectId;
    let tvShowId: mongoose.Types.ObjectId;

    beforeEach(async () => {
        const user = await UserModel.create({
            username: 'testuser',
            preferences: { favoriteGenres: [], dislikedGenres: [] },
            watchHistory: [],
            myList: []
        }) as User & { _id: mongoose.Types.ObjectId };

        userId = user._id;

        const movie = await MovieModel.create({
            title: 'Test Movie',
            description: 'A test movie',
            genres: ['Action'],
            releaseDate: new Date(),
            director: 'Director',
            actors: ['Actor 1', 'Actor 2']
        }) as Movie & { _id: mongoose.Types.ObjectId };

        movieId = movie._id;

        const tvShow = await TvshowModel.create({
            title: 'Test TV Show',
            description: 'A test TV show',
            genres: ['Drama'],
            episodes: [{
                episodeNumber: 1,
                seasonNumber: 1,
                releaseDate: new Date(),
                director: 'Director',
                actors: ['Actor 1', 'Actor 2']
            }]
        }) as TVShow & { _id: mongoose.Types.ObjectId };
        
        tvShowId = tvShow._id;
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
        await MovieModel.deleteMany({});
        await TvshowModel.deleteMany({});
    });

    it('should add a movie to the list and populate details', async () => {
        const resAdd = await request(app)
            .post('/mylist')
            .send({ userId, contentId: movieId, contentType: 'movie' });

        expect(resAdd.status).toBe(201);
        expect(resAdd.text).toBe('Item added to list');

        const resList = await request(app)
            .get('/mylist')
            .send({ userId });
        
        expect(resList.status).toBe(200);
        expect(resList.body.items.length).toBe(1);
        expect(resList.body.items[0].contentId._id).toBe(movieId.toString());
        expect(resList.body.items[0].contentId.title).toBe('Test Movie');
    });

    it('should add a TV show to the list and populate details', async () => {
        const resAdd = await request(app)
            .post('/mylist')
            .send({ userId, contentId: tvShowId, contentType: 'tvshow' });

        expect(resAdd.status).toBe(201);
        expect(resAdd.text).toBe('Item added to list');

        const resList = await request(app)
            .get('/mylist')
            .send({ userId });

        expect(resList.status).toBe(200);
        expect(resList.body.items.length).toBe(1);
        expect(resList.body.items[0].contentId._id).toBe(tvShowId.toString());
        expect(resList.body.items[0].contentId.title).toBe('Test TV Show');
    });
});
