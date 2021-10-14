import jwt from 'jsonwebtoken'

import { auth } from './index'
import { createRefreshToken } from '../../database'

export function generateJwtAndRefreshToken(
  email: string,
  payload: object = {}
) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: 5, // 5 seconds //TODO Change after testing
  })

  const refreshToken = createRefreshToken(email)

  return {
    token,
    refreshToken,
  }
}
