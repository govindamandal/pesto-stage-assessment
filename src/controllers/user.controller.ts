import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const addUser = async (req: Request, res: Response) => {
    const data = req.body;

    const user = await UserModel.find({ username: data.username });

    if (user.length) {
        res.status(401).send({ message: `Username ${data.username} is already taken, please choose different!` });
    } else {
        try {
            const result = await UserModel.create(data);
            return res.status(201).send({ message: 'User was added successfully', data: result });
        } catch (error: any) {
            res.status(401).send({ message: `Error: ${error.message}` })
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const data = req.body;
    const { userId } = req.params;
    const { username } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
        return res.status(404).send({ message: 'User not found!' });
    }

    const user1 = await UserModel.findOne({ username, _id: { $ne: userId } });

    if (username === user1?.username) {
        return res.status(401).send({ message: `Error: username is already taken` })
    }

    const result = await UserModel.findByIdAndUpdate(userId, data);
    res.status(200).send({ message: `User was updated successfully!`, data: result });
}

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(401).send({ message: `Error: User not found!` })
    }

    try {
        await UserModel.findByIdAndDelete(userId);
        res.status(201).send({ message: 'User was deleted successfully' });
    } catch (error: any) {
        res.status(401).send({ message: `Error: ${error.message}` })
    }
}

export const list = async (req: Request, res: Response) => {
    const { name } = req.query;
    const search: any = {};
    if (name) {
        search.name = { $regex: '.*' + name + '.*' };
    }
    const users = await UserModel.find(search);
    return res.status(200).send({ data: users });
}