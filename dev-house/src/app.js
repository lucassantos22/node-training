import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import routes from './routes';

const app = express();

// Coneção com o banco de dados
mongoose.connect(
    'mongodb+srv://devhouse:devhouse@devhouse.kqf7nd7.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Configura CORS
app.use(cors());

// Cadastrar rotas para imagens dentro de uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// Configuração para aceitar json no body da requisição
app.use(express.json());

// Importando nossas rotas
app.use(routes);

export default app;
