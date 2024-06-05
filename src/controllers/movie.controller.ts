import { Request, Response } from "express";
import MovieModel from "../models/movie.model";

//add movie
export const addMovie = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await MovieModel.create(data);
        return res.status(201).send({ message: 'Movie was added successfully', data: result });
    } catch (error: any) {
        return res.status(401).send({ message: `Error: ${error.message}` })
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const data = req.body;
    const movie = await MovieModel.findById(movieId);
    if (!movie) {
        res.status(401).send({ message: `Error: Movie not found!` })
    } else {
        try {
            const result = await MovieModel.findByIdAndUpdate(movieId, data);
            return res.status(201).send({ message: 'Movie was updated successfully', data: result });
        } catch (error: any) {
            return res.status(401).send({ message: `Error: ${error.message}` })
        }
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const movie = await MovieModel.findById(movieId);
    if (!movie) {
        res.status(401).send({ message: `Error: Movie not found!` })
    } else {
        try {
            await MovieModel.findByIdAndDelete(movieId);
            return res.status(200).send({ message: 'Movie was deleted successfully' });
        } catch (error: any) {
            return res.status(401).send({ message: `Error: ${error.message}` })
        }
    }
}

export const list = async (req: Request, res: Response) => {
    const filter = req.query.search;
    const search: any = {};

    if (filter) {
        search.title = { $regex: '.*' + filter + '.*' };
        search.description = { $regex: '.*' + filter + '.*' };
    }

    const movies = await MovieModel.find(search);
    return res.status(200).send({ data: movies });
}