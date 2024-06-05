import { Request, Response } from "express";
import TvshowModel from "../models/tvshow.model";

//add movie
export const addTVShow = async (req: Request, res: Response) => {
    const data = req.body; 
    try {
        const result = await TvshowModel.create(data);
        res.status(201).send({message: 'TVShow was added successfully', data: result});
    } catch (error: any) {
        res.status(401).send({message: `Error: ${error.message}`})
    }
}

export const updateTVShow = async (req: Request, res: Response) => {
    const { tvshowId } = req.params;
    const data = req.body;
    const movie = await TvshowModel.findById(tvshowId);
    if (!movie) {
        res.status(401).send({message: `Error: TVShow not found!`})
    } else {
        try {
            const result = await TvshowModel.findByIdAndUpdate(tvshowId, data);
            res.status(201).send({message: 'TVShow was updated successfully', data: result});
        } catch (error: any) {
            res.status(401).send({message: `Error: ${error.message}`})
        }
    }
}

export const deleteTVShow = async (req: Request, res: Response) => {
    const { tvshowId } = req.params;
    const movie = await TvshowModel.findById(tvshowId);
    if (!movie) {
        res.status(401).send({message: `Error: TVShow not found!`})
    } else {
        try {
            await TvshowModel.findByIdAndDelete(tvshowId);
            res.status(201).send({message: 'TVShow was deleted successfully'});
        } catch (error: any) {
            res.status(401).send({message: `Error: ${error.message}`})
        }
    }
}