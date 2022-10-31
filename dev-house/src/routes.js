import { Router } from 'express'

import SessionController from './controllers/SessionController'

const routes = new Router

routes.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

routes.post('/sessions', SessionController.store)

export default routes