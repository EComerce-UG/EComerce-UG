import express from 'express'
import router from './routes';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use((_, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = 6969;

app.listen(PORT, () => {
    console.log('Listening in server! \n Current port: ' + PORT);
});
