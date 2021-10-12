import { User } from '../../models/login'
import { Request, Response } from 'express'
/* 
interface UserData {
    name: String,
    email: String,
    birthday: String
 */

export const getLogin = (req: Request, res: Response) => {
  res.status(200).send('Running')
}

export const postUserLogin = async (req: Request, res: Response) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    birthdate: req.body.birthdate,
  })
  try {
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getUsersLogin = async (req: Request, res: Response) => {
  const users = await User.find({})

  try {
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
}
