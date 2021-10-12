import { Router } from 'express'
import { getLogin, postUserLogin, getUsersLogin } from '../controllers/index'

const routers = Router()

routers.get('/', getLogin)

routers.post('/login_user', postUserLogin)

routers.get('/users', getUsersLogin)

export default routers
