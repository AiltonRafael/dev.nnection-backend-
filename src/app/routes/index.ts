import { Router } from 'express'
import { addUserInformationToRequest } from '../config/middleware/addUserInformationToRequest'
import { checkAuthMiddleware } from '../config/middleware/checkAuthMiddleware'
import {
  getLogin,
  postUserLogin,
  getUsers,
  getUserByID,
  postUserToken,
  postRefreshToken,
  getMySession,
} from '../controllers/index'

const routers = Router()

routers.get('/', getLogin)

routers.post('/login_user', postUserLogin)

routers.get('/users', getUsers)
routers.get('/users/:id', getUserByID)

routers.post('/sessions', postUserToken)

routers.post('/refresh', addUserInformationToRequest, postRefreshToken)

routers.get('/me', checkAuthMiddleware, getMySession)
export default routers
