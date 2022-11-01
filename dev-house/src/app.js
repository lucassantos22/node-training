import express from 'express';
import mongoose from 'mongoose';
import path from 'path'

import routes from './routes';

const app = express();

mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.kqf7nd7.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Cadastrar rotas para imagens dentro de uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

// Configuração para aceitar json no body da requisição
app.use(express.json())

// Importando nossas rotas
app.use(routes)

export default app