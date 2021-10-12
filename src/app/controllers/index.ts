import { User } from '../../models/login'
import { Request, Response } from 'express'

export const getLogin = (req: Request, res: Response) => {
  res.status(200).send('Running')
}

export const postUserLogin = async (req: Request, res: Response) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    birthdate: req.body.birthdate,
    created_at: req.body.created_at
  })
  
  const useExists = await User.exists({email: req.body.email})

  if(!useExists) {
    try {
        await user.save()
        res.send('Registered!')
      } catch (error) {
        res.status(500).send(error)
      }
  } else (res.send('User exists'))

}

export const getUsersLogin = async (req: Request, res: Response) => {
  const users = await User.find({})

  try {
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
}
