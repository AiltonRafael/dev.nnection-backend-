const userModel = require('../../models/login')
import { Request, Response } from 'express'

export const getLogin = (req: Request, res: Response) => {
    res.status(200).send('Running')
}

export const postUserLogin = async (req: Request, res: Response) => {
    const user = new userModel(req.body);
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUsersLogin = async (req: Request, res: Response) => {
    const users = await userModel.find({});

    try{   
        res.send(users)

    } catch (error) {
        res.status(500).send(error)
    }
}