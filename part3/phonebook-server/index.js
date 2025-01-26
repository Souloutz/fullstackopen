const express = require('express');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const port = process.env.PORT | 3001;
app.use(express.json());

const persons = require('./persons.json');

app.get('/', (req, res) => {
    res.send('<h1>PhoneBook Server</h1>');
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});