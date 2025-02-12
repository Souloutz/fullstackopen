const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const notesRouter = require('./routes/notes');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

// Backend Config
logger.info('Connecting to MongoDB...');
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('Could not connect to MongoDB:', err.message));

// Server Config
const app = express();
const options = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
};
app.use(cors(options));
app.use(express.json());         // allows access to request body
app.use(express.static('dist')); // serves index.html in production build on '/' route
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;