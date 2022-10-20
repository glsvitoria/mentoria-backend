import { Router } from 'express'
import CryptoController from './controllers/CryptoController'

const routes = Router()

routes.get('/cripto', CryptoController.index)
routes.get('/cripto/:id', CryptoController.selectId)
routes.post('/cripto', CryptoController.create)
routes.put('/cripto/:id', CryptoController.update)
routes.delete('/cripto/:id', CryptoController.delete)

export default routes