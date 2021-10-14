import express from 'express'
import { seedUserStore } from '../database'
import appConfig from './config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

seedUserStore()

appConfig(app)

export default app
