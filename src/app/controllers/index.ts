import { User, Post } from '../../models/login'
import { Request, Response } from 'express'
import { CreateSessionDTO } from '../../utils/types'
import { generateJwtAndRefreshToken } from '../config/auth'
import {
  checkRefreshTokenIsValid,
  users,
  invalidateRefreshToken,
} from '../../database'
import mongoose from 'mongoose'

export const getLogin = (req: Request, res: Response) => {
  res.status(200).send('Running')
}

export const postUserLogin = async (req: Request, res: Response) => {
  const { first_name, last_name, email, birthday, password, created_at } =
    req.body

  const user = new User({
    first_name,
    last_name,
    email,
    birthday,
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

export const getUsers = async (req: Request, res: Response) => {
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

export const postUserToken = async (req: Request, res: Response) => {
  const { email, password } = req.body as CreateSessionDTO

  const user = await User.find({ email })

  if (!user || password !== user[0]?.password) {
    return res.status(401).json({
      error: true,
      message: 'E-mail or password incorrect.',
    })
  }

  const { token, refreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
  })

  return res.json({
    token,
    refreshToken,
    permissions: user.permissions,
    roles: user.roles,
  })
}

export const postRefreshToken = async (req: Request, res: Response) => {
  const email = req.user
  const { refreshToken } = req.body

  const user = await User.find({ email })

  if (!user[0]) {
    return res.status(401).json({
      error: true,
      message: 'User not found.',
    })
  }

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' })
  }

  const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)

  if (!isValidRefreshToken) {
    return res
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' })
  }

  invalidateRefreshToken(email, refreshToken)

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(
    email,
    {
      permissions: user.permissions,
      roles: user.roles,
    }
  )

  return res.json({
    token,
    refreshToken: newRefreshToken,
    permissions: user.permissions,
    roles: user.roles,
  })
}

export const getMySession = async (req: Request, res: Response) => {
  const email = req.user

  const user = await User.find({ email })

  if (!user[0]) {
    return res.status(400).json({ error: true, message: 'User not found.' })
  }

  const { first_name, last_name } = user[0]

  return res.json({
    first_name,
    last_name,
    email,
    permissions: user.permissions,
    roles: user.roles,
  })
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({})

    res.send({
      posts,
    })

    return
  } catch (error) {
    res.status(500).send(error)
  }
}
