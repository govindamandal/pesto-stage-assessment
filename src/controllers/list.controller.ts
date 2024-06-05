import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import MovieModel from '../models/movie.model';
import TvshowModel from '../models/tvshow.model';
import mongoose from 'mongoose';

// Add to My List
export const addToList = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { contentId, contentType } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).send('Invalid content ID');
    }

    const objectId = new mongoose.Types.ObjectId(contentId);

    const existsInList = user.myList.some(item => item.contentId.equals(objectId));

    if (existsInList) {
      return res.status(400).send('Item already in list');
    }

    if (contentType === 'movie') {
      const movie = await MovieModel.findById(contentId);
      if (!movie) {
        return res.status(404).send('Movie not found');
      }

    } else if (contentType === 'tvshow') {

      const tvShow = await TvshowModel.findById(contentId);
      if (!tvShow) {
        return res.status(404).send('TV Show not found');
      }
    } else {
      return res.status(400).send('Invalid content type');
    }

    user.myList.push({ contentId, contentType });
    await user.save();

    res.status(201).send('Item added to list');
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

// Remove from My List
export const removeFromList = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { contentId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const initialLength = user.myList.length;
    const objectId = new mongoose.Types.ObjectId(contentId);
    user.myList = user.myList.filter(item => item.contentId.equals(contentId));

    if (user.myList.length === initialLength) {
      return res.status(404).send('Item not found in list');
    }

    await user.save();

    res.status(200).send('Item removed from list');
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

// List My Items
export const listMyItems = async (req: Request, res: Response) => {

  const { userId } = req.body;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (!userId) {
    return res.status(401).send('Invalid userId');
  }

  try {
    const user = await UserModel.findById(userId).populate({
      path: 'myList.contentId',
      select: 'title description genres releaseDate director actors episodes',
    }).exec();
    if (!user) {
      return res.status(404).send('User not found');
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const myList = user.myList.slice(startIndex, endIndex);

    return res.status(200).json({
      page,
      limit,
      totalItems: user.myList.length,
      items: myList
    });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};
