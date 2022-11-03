import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionController from './controllers/SessionController'
import HouseController from './controllers/HouseController'

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

export default routes