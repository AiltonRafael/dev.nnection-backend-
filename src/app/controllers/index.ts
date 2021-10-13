import { User } from '../../models/login'
import { Request, Response } from 'express'

export const getLogin = (req: Request, res: Response) => {
  res.status(200).send('Running')
}

export const postUserLogin = async (req: Request, res: Response) => {
  const { name, email, birthdate, password, created_at } = req.body

  const user = new User({
    name,
    email,
    birthdate,
    password,
    created_at,
  })

  const userExists = await User.exists({ email })

  if (!userExists) {
    try {
      await user.save()
      res.send('Registered!')
    } catch (error) {
      res.status(500).send(error)
    }
  } else res.status(403).send({ error: 'User exists!' })
}

export const getUsersLogin = async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
    const { page = 1, per_page = 10 } = req.query

    const totalUsers = users.length

    const pageStart = (Number(page) - 1) * Number(per_page)
    const pageEnd = pageStart + Number(per_page)

    res.send({
      users: users.slice(pageStart, pageEnd),
      totalUsers,
    })

    return
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getUserByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.find({ _id: String(id) })

    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
}
