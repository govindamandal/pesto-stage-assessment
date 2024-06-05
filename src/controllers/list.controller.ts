import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import MovieModel from '../models/movie.model';
import TvshowModel from '../models/tvshow.model';

// Add to My List
export const addToList = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { contentId, contentType } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const existsInList = user.myList.some(item => item.contentId === contentId);
    if (existsInList) {
      return res.status(400).send('Item already in list');
    }

    if (contentType === 'Movie') {
      const movie = await MovieModel.findById(contentId);
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
    } else if (contentType === 'TVShow') {
      const tvShow = await TvshowModel.findById(contentId);
      if (!tvShow) {
        return res.status(404).send('TV Show not found');
      }
    } else {
      return res.status(400).send('Invalid content type');
    }

    user.myList.push({ contentId, contentType });
    await user.save();

    res.status(200).send('Item added to list');
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
    user.myList = user.myList.filter(item => item.contentId !== contentId);

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
  console.log(req.body);
  
  const { userId } = req.body;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const myList = user.myList.slice(startIndex, endIndex);

    res.status(200).json({
      page,
      limit,
      totalItems: user.myList.length,
      items: myList
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
