import express from 'express';
import mongoose from 'mongoose';

import routes from './routes';

const app = express();

mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.kqf7nd7.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json())
app.use(routes)

export default app