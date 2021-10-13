import mongoose from 'mongoose'
import 'dotenv/config'
import { RefreshTokensStore, UsersStore } from '../utils/types'
import { v4 as uuid } from 'uuid'

const mongoURI = process.env.MONGO_URI
export default function connectToMongoDB(): void {
  if (mongoURI) {
    mongoose.connect(mongoURI, () => console.log(`Connected to mongoBD`))
  } else {
    console.log('Failed to connect')
  }
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error: '))
  db.once('open', function () {
    console.log('Connected successfully')
  })
}

export const users: UsersStore = new Map()

export const tokens: RefreshTokensStore = new Map()

export function seedUserStore() {
  users.set('manofgpa@gmail.com', {
    password: '12345678',
    permissions: ['users.list', 'users.create', 'metrics.list'],
    roles: ['administrator'],
  })

  users.set('cornela@gmail.com', {
    password: '12345678',
    permissions: ['users.list', 'metrics.list'],
    roles: ['editor'],
  })
}

export function createRefreshToken(email: string) {
  const currentUserTokens = tokens.get(email) ?? []
  const refreshToken = uuid()

  tokens.set(email, [...currentUserTokens, refreshToken])

  return refreshToken
}

export function checkRefreshTokenIsValid(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  return storedRefreshTokens.some(token => token === refreshToken)
}

export function invalidateRefreshToken(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  tokens.set(
    email,
    storedRefreshTokens.filter(token => token !== refreshToken)
  )
}
