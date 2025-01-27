const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT | 3001;
app.use(express.json());

let persons = require('./persons.json');

app.get('/', (req, res) => {
    res.send('<h1>PhoneBook Server</h1>');
});

app.get('/info', (req, res) => {
    res.send(`
        <p>PhoneBook has info for ${persons.length} people!</p>
        <p>${(new Date()).toUTCString()}</p>
    `);
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

const generateID = () => {
    return Math.floor(Math.random() * Number.MAX_VALUE);
}

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            error: 'Content missing'
        });
    }

    const name = body.name;
    const number = body.number;

    if (!name || !number) {
        return res.status(400).json({
            error: 'Content missing'
        });
    }

    if (persons.some(person => person.name === name)) {
        return res.status(400).json({
            error: 'Duplicate name (must be unique)'
        });
    }

    const newPerson = {
        id: generateID(),
        name: name,
        number: number
    };

    persons = persons.concat(newPerson);
    res.status(201).json(newPerson);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});