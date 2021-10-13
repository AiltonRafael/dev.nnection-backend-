import { Router } from 'express'
import {
  getLogin,
  postUserLogin,
  getUsersLogin,
  getUserByID,
} from '../controllers/index'

const routers = Router()

routers.get('/', getLogin)

routers.post('/login_user', postUserLogin)

routers.get('/users', getUsersLogin)
routers.get('/users/:id', getUserByID)

export default routers
