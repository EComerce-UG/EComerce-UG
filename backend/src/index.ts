import express from 'express';
import 'dotenv/config'; // Para cargar el .env
import routes from './routes/index';

const app = express();
app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
