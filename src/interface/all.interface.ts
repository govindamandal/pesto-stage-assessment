import { Document } from "mongoose";
import { Genre } from "./genre";

interface Episode {
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
}

interface WatchHistory {
    contentId: string;
    watchedOn: Date;
    rating?: number;
}

export interface User extends Document {
    id: string;
    username: string;
    preferences: {
        favoriteGenres: Genre[];
        dislikedGenres: Genre[];
    };
    watchHistory: WatchHistory[];
    myList: { contentId: string; contentType: 'Movie' | 'TVShow' }[];
}

export interface Movie extends Document{
    id: string;
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors: string[];
}

export interface TVShow extends Document{
    id: string;
    title: string;
    description: string;
    genres: Genre[];
    episodes: Episode[];
}