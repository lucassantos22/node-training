import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionController from './controllers/SessionController'
import HouseController from './controllers/HouseController'
import DashboardController from './controllers/DashboardController'

const routes = new Router
const upload = multer(uploadConfig)

routes.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

routes.post('/sessions', SessionController.store)
routes.post('/houses', upload.single('thumbnail'), HouseController.store)
routes.get('/houses', HouseController.index)
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update)
routes.delete('/houses/:id', HouseController.destroy)
routes.get('/dashboard', DashboardController.show)

export default routes