import { Router } from 'express';
import { db } from '../firebase';

const router = Router();

router.get('/test-firebase', async (req, res) => {
  try {
    const docRef = db.collection('test-collection').doc('prueba');
    await docRef.set({ conectado: true, timestamp: new Date() });
    const doc = await docRef.get();
    res.json({ message: 'Conectado a Firebase ', data: doc.data() });
  } catch (error) {
    console.error('Error de Firebase:', error);
    res.status(500).json({ error: 'Error al conectar con Firebase' });
  }
});

export default router;
