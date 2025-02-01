const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://howardkong826:${password}@fullstackopen.q8zxh.mongodb.net/notely?retryWrites=true&w=majority&appName=FullStackOpen`;

mongoose.set('strictQuery', false);
mongoose.connect(uri)
.then(console.log('Connected to MongoDB'))
.catch(err => console.log('Could not connect to MongoDB', err));

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'HTML is easy',
    important: true,
})

note.save()
.then(result => {
    console.log('Note saved!');
    mongoose.connection.close();
})
.catch(err => console.log('Error saving note:', err));