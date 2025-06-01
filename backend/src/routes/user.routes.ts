import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { AuthMiddleware } from '../middleware/auth.middleware'

const router = Router()

// Rutas de usuario - IMPORTANTE: estas rutas ya tienen el prefijo /api/users/
router.post('/create', UserController.create) // Será /api/users/create
router.put('/update/:id', AuthMiddleware.verifyToken, UserController.update) // Será /api/users/update/:id
router.delete('/delete/:id', AuthMiddleware.verifyToken, UserController.delete) // Será /api/users/delete/:id
router.get('/getall', AuthMiddleware.verifyToken, UserController.getAll) // Será /api/users/getall
router.get('/getbyid/:id', AuthMiddleware.verifyToken, UserController.getById) // Será /api/users/getbyid/:id
router.get('/getbyusername/:username', AuthMiddleware.verifyToken, UserController.getByUsername) // Será /api/users/getbyusername/:username
router.post('/getLikes', AuthMiddleware.verifyToken, UserController.getProductsFromUser);
router.post('/updateLikes', AuthMiddleware.verifyToken, UserController.deleteFromLikesProductUser);
router.post('/addLikes', AuthMiddleware.verifyToken, UserController.addToLikesProductUser);

export default router