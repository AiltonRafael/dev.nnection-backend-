import { Express } from 'express'

import connectToMongoDB from '../../database'
import appMiddleware from './middleware';

export default function appConfig(app: Express): void {

    connectToMongoDB();
    appMiddleware(app)

}