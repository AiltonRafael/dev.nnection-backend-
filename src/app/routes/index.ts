import { Router } from 'express'
const userModel = require('../../models/login/index')

const routers = Router()

routers.get('/', (req, res) => {
    res.status(200).send('Running')
})

routers.post('/login_user', async (req, res) => {
    const user = new userModel(req.body);
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
})

routers.get('/users', async (req, res) => {
    const users = await userModel.find({});

    try{   
        res.send(users)

    } catch (error) {
        res.status(500).send(error)
    }
})

export default routers;