import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { DecodedToken } from '../../../utils/types'
import { auth } from '../../config'

export const checkAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    console.log(req)

    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  const [, token] = authorization?.split(' ')

  if (!token) {
    console.log('token')

    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  try {
    const decoded = jwt.verify(token as string, auth.secret) as DecodedToken

    req.user = decoded.sub

    return next()
  } catch (err) {
    return res
      .status(401)
      .json({ error: true, code: 'token.expired', message: 'Token invalid.' })
  }
}
