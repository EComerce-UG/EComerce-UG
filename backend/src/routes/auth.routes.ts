import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const router = Router()

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
const { AuthMiddleware } = require('../middleware/auth.middleware')
router.get('/user', AuthMiddleware.verifyToken, AuthController.getUserFromToken)

export default router;