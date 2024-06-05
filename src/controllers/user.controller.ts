import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const addUser = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await UserModel.find({username: data.username });

    if (user) {
        res.status(401).send({message: `Username ${data.username} is already taken, please choose different!`});
    } else {
        try {
            const result = await UserModel.create(data);
            res.status(201).send({message: 'User was added successfully', data: result});
        } catch (error: any) {
            res.status(401).send({message: `Error: ${error.message}`})
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const data = req.body;
    const { userId } = req.params;
    const { username } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
        res.status(404).send({message: 'User noit found!'});
    }

    const user1 = await UserModel.findOne({username, _id: { $ne: userId }});

    if (username === user1?.username) {
        res.status(401).send({message: `Error: username is already taken`})
    }

    const result = await UserModel.findByIdAndUpdate(userId, data);
    res.status(200).send({message: `User was updated successfully!`, data: result});

    try {
        const result = await UserModel.create(data);
    } catch (error: any) {
        res.status(401).send({message: `Error: ${error.message}`})
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
        res.status(401).send({message: `Error: User not found!`})
    } else {
        try {
            await UserModel.findByIdAndDelete(userId);
            res.status(201).send({message: 'User was deleted successfully'});
        } catch (error: any) {
            res.status(401).send({message: `Error: ${error.message}`})
        }
    }
}