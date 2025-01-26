const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

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
        "id": "014d",
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

app.listen(port, () => {
    console.log(`Server running at 'http://localhost:${port}'`);
});