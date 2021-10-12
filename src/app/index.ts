import express from 'express'
import appConfig from './config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

appConfig(app)

export default app
