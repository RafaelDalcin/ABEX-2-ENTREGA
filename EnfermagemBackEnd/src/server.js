import 'dotenv/config';
import express from 'express';
import routes from './routes';
require('./models/index');


const PORT = process.env.PORT;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

routes(app);
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada')
});

app.listen(PORT, () => {
  console.log(`Servidor de enfermagem rodando na porta ${PORT}!`);
});