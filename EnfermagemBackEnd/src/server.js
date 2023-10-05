import 'dotenv/config';
import express from 'express';
import routes from './routes';
import cors from 'cors';
require('./models/index');


const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

routes(app);
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada')
});

app.listen(PORT, () => {
  console.log(`Servidor de enfermagem rodando na porta ${PORT}!`);
});