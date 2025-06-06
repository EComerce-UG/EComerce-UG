import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/user', AuthMiddleware.verifyToken, AuthController.getUserFromToken);

export default router;