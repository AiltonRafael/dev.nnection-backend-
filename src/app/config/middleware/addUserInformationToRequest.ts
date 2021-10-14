import { NextFunction } from 'express'
import { decode } from 'jsonwebtoken'
import { DecodedToken } from '../../../utils/types'

interface CustomHeaders extends Headers {
  authorization: string
}

export const addUserInformationToRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  const [, token] = authorization?.split(' ')

  if (!token) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  try {
    const decoded = decode(token as string) as DecodedToken

    req.user = decoded.sub

    return next()
  } catch (err) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Invalid token format.',
    })
  }
}
