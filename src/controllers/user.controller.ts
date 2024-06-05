import { Request, Response } from 'express';
import { addToMyList, removeFromMyList, getMyList } from '../services/user.service';

export const addToMyListController = async (req: Request, res: Response) => {
  const { userId, contentId } = req.body;
  try {
    const user = await addToMyList(userId, contentId);
    res.json(user);
  } catch (error: Error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromMyListController = async (req: Request, res: Response) => {
  const { userId, contentId } = req.params;
  try {
    const user = await removeFromMyList(userId, contentId);
    res.json(user);
  } catch (error: Error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyListController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const page
