require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV;

app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static('dist'));
app.get('/', (req, res) => {
    res.send('<h1>PhoneBook Server</h1>');
});

app.get('/info', (req, res) => {
    Person.find({})
        .then(people => {
            return res.send(`
                <p>PhoneBook has info for ${people.length} people!</p>
                <p>${(new Date()).toUTCString()}</p>
            `);
        })
        .catch(res.status(500).end());
});

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(people => {
            return res.json(people);
        })
        .catch(() => res.status(500).end());
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const name = body.name;
    const number = body.number;

    if (!body || !name || !number) {
        return res.status(400).json({ error: 'Content missing' });
    }

    Person.find({ name: name })
        .then(people => {
            if (people.length != 0) {
                return res.status(400).json({ error: 'Duplicate name (must be unique)' });
            }
            
            const newPerson = new Person({ name, number });
            newPerson.save().then(returnedNote => {
                res.status(201).json(returnedNote);
            });
        })
        .catch(() => res.status(500).end());
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person === null)
                return res.status(404).end();
        
            res.json(person);
        })
        .catch(() => res.status(500).end());
});

app.put('/api/persons/:id', (req, res) => {
    const body = req.body;
    const name = body.name;
    const number = body.number;

    if (!body || !name || !number) {
        return res.status(400).json({ error: 'Content missing' });
    }

    Person.findByIdAndUpdate(req.params.id, body)
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(() => res.status(500).end());
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(deletedPerson => {
            if (!deletedPerson)
                return res.status(404).json({ error: 'Person not found' });

            res.status(204).end();
        })
        .catch(() => res.status(500).end());
});

// Middleware to Handle Unknown Endpoints
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown Endpoint '});
};

app.use(unknownEndpoint);

app.listen(port, () => {
    if (env === 'development')
        console.log(`Server running at http://localhost:${port}`);
    else 
        console.log(`Server running on port ${port}`);
});