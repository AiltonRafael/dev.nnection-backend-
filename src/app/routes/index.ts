import { Router } from 'express'
import { addUserInformationToRequest } from '../config/middleware/addUserInformationToRequest'
import {
  getLogin,
  postUserLogin,
  getUsersLogin,
  getUserByID,
  postUserToken,
  postRefreshToken,
} from '../controllers/index'

const routers = Router()

routers.get('/', getLogin)

routers.post('/login_user', postUserLogin)

routers.get('/users', getUsersLogin)
routers.get('/users/:id', getUserByID)

routers.post('/sessions', postUserToken)

routers.post('/refresh', addUserInformationToRequest, postRefreshToken)

export default routers
