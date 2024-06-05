import { Request, Response } from "express";
import TvshowModel from "../models/tvshow.model";

//add tvshow
export const addTVShow = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await TvshowModel.create(data);
        return res.status(201).send({ message: 'TVShow was added successfully', data: result });
    } catch (error: any) {
        return res.status(401).send({ message: `Error: ${error.message}` })
    }
}

export const updateTVShow = async (req: Request, res: Response) => {
    const { tvshowId } = req.params;
    const data = req.body;
    const tvshow = await TvshowModel.findById(tvshowId);
    if (!tvshow) {
        return res.status(401).send({ message: `Error: TVShow not found!` })
    } else {
        try {
            const result = await TvshowModel.findByIdAndUpdate(tvshowId, data);
            return res.status(201).send({ message: 'TVShow was updated successfully', data: result });
        } catch (error: any) {
            return res.status(401).send({ message: `Error: ${error.message}` })
        }
    }
}

export const deleteTVShow = async (req: Request, res: Response) => {
    const { tvshowId } = req.params;
    const tvshow = await TvshowModel.findById(tvshowId);
    if (!tvshow) {
        res.status(401).send({ message: `Error: TVShow not found!` })
    } else {
        try {
            await TvshowModel.findByIdAndDelete(tvshowId);
            return res.status(201).send({ message: 'TVShow was deleted successfully' });
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
    
    const tvshows = await TvshowModel.find(search);
    return res.status(200).send({ data: tvshows });
}