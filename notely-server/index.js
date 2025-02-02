require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');

// Server Config
const app = express();
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV;

const options = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
};
app.use(cors(options));
app.use(express.json()); // used for accessing request body

let notes = [];

const requestLogger = (req, res, next) => {
    console.log('--- Incoming Request ---')
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('------------------------');
    next();
};
app.use(requestLogger);
app.use(express.static('dist')); // serve index.html in production build on '/' route

app.get('/api/notes', (req, res) => {
    Note.find({})
        .then(notes => {
            res.json(notes);
        })
        .catch(err => next(err));
});

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note === null) 
                return res.status(404).end();

            res.json(note);
        })
        .catch(err => next(err));
});

app.post('/api/notes', (req, res) => {
    const body = req.body;

    if (!body.content) 
        return res.status(400).json({ error: 'Content missing' });

    const newNote = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    });

    newNote.save()
        .then(savedNote => {
            res.json(savedNote);
        })
        .catch(err => next(err));
});

app.put('/api/notes/:id', (req, res) => {
    const body = req.body
    
    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(req.params.id, note,{ new: true })
        .then(updatedNote => {
            res.json(updatedNote);
        })
        .catch(err => next(err));
});

app.delete('/api/notes/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => next(err));
});

// Middleware to Handle Unknown Endpoints
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown Endpoint '});
};
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.log(err.message);

    if (err.name === 'CastError')
        return res.status(400).send({ error: 'Malformatted ID' });

    next(err);
}
app.use(errorHandler);

app.listen(port, () => {
    if (env === "development")
        console.log(`Server running at 'http://localhost:${port}'`);
    else
        console.log(`Server running on port ${port}`);
});