import express from 'express';
import cors from 'cors';
import signRoute from './routes/signRoute.js'

export const app = express();
app.use(express.json());
app.use(cors());

app.use([signRoute]);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
  console.log(`Use: http://localhost:${process.env.PORT}`);
});