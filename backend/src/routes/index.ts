import { Router } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

// Registrar las rutas de usuarios con el prefijo /users
router.use('/users', userRoutes);

// Registrar las rutas de autenticación con el prefijo /auth  
router.use('/auth', authRoutes);

// Ruta de prueba para verificar que la API funciona
router.get('/', (req, res) => {
  res.json({ 
    message: 'API funcionando correctamente',
    endpoints: {
      users: '/api/users/*',
      auth: '/api/auth/*'
    }
  });
});

// Ruta de test de Firebase (opcional)
router.get('/test-firebase', async (req, res) => {
  try {
    // Aquí puedes poner tu código de test de Firebase si lo necesitas
    res.json({ message: 'Test endpoint disponible' });
  } catch (error) {
    console.error('Error de Firebase:', error);
    res.status(500).json({ error: 'Error al conectar con Firebase' });
  }
});

export default router;