import { Request, Response } from "express";
import MovieModel from "../models/movie.model";

//add movie
export const addMovie = async (req: Request, res: Response) => {
    const data = req.body;    
    try {
        const result = await MovieModel.create(data);
        res.status(201).send({message: 'Movie was added successfully'});
    } catch (error: any) {
        res.status(402).send({message: `Error: ${error.message}`})
    }
}