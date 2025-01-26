const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json()); // used for accessing request body

let notes = [
    {
        "id": "1",
        "content": "HTML is easy",
        "important": false
    },
    {
        "id": "2",
        "content": "Browser can execute only JavaScript",
        "important": false
    },
    {
        "id": "3",
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": false
    },
    {   
        "id": "4",
        "content": "Saved",
        "important": false
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id);
    
    if (note) {
        res.json(note);
    } else {
        // end responds without sending any data
        res.status(404).end();
    }
});

const generateID = () => {
    // console.log(...notes.map(note => Number(note.id)));
    const maxID = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0;
    return String(maxID + 1);
}

app.post('/api/notes', (req, res) => {
    const body = req.body;

    if (!body.content) {
        return res.status(400).json({
            error: 'Content missing'
        });
    }

    const note = {
        id: generateID(),
        content: body.content,
        important: Boolean(body.important) || false,
    }

    notes = notes.concat(note);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);

    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server running at 'http://localhost:${port}'`);
});