import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


if(process.env.NODE_ENV === "development") {
  // Configuración de CORS
  const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
  };
  app.use(cors(corsOptions));
} else if(process.env.NODE_ENV === "production") {
  app.use(cors({origin: true}));
}
app.use(express.json());

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Usar el router principal con prefijo /api
app.use('/api', router);

// Middleware para rutas no encontradas
app.use((req, res) => {
    console.log(`Ruta no encontrada: ${req.method} ${req.path}`);
    res.status(404).json({ error: 'Ruta no Encontrada' });
});

const PORT = process.env.BACKEND_PORT || 3020;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
    console.log(`Rutas disponibles:`);
    console.log(`- GET  http://localhost:${PORT}/api/`);
    console.log(`- POST http://localhost:${PORT}/api/users/create`);
    console.log(`- POST http://localhost:${PORT}/api/auth/login`);
    console.log(`- Trabajando en: ` + process.env.NODE_ENV);
});