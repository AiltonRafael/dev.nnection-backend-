import { Router } from 'express'
import {
  getLogin,
  postUserLogin,
  getUsersLogin,
  getUserByID,
  postUserToken,
} from '../controllers/index'

const routers = Router()

routers.get('/', getLogin)

routers.post('/login_user', postUserLogin)

routers.get('/users', getUsersLogin)
routers.get('/users/:id', getUserByID)

routers.post('/sessions', postUserToken)

export default routers
