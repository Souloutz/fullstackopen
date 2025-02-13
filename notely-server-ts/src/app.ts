import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import notesRouter from './routes/notes';
import middleware from './utils/middleware';
import logger from './utils/logger';
import config from './utils/config';

// Backend Config
logger.info('Connecting to MongoDB...');
if (typeof config.MONGODB_URI !== 'string') {
    console.error('MongoDB URI not set');
    process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err: Error) => {
        console.log('Error connecting to MongoDB:', err.message);
    });

// Server Config
const app = express();
const options = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
};
app.use(cors(options));
app.use(express.json()); // used for accessing request body
app.use(express.static('dist')); // serve index.html in production build on '/' route
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

export default app;