import cors from 'cors'
import routers from '../../routes'
import express, { Express } from 'express'

export default function appMiddleware(app: Express): void {
  app.use(cors()),
    app.use(routers),
    app.use(express.json()),
    app.use(
      express.urlencoded({
        extended: true,
      })
    )
}
