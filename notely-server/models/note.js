// require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log(`Connecting to ${url}`);

mongoose.set('strictQuery', false);
mongoose.connect(url)
    .then(_ => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err.message);
    });

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true,
    },
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Note', noteSchema);