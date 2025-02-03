const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => ('Error connecting to MongoDB:', err.message));

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must have a minimum length of 3'],
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: (value) => {
                return /\d{3}-\d{3}-\d{4}/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true,
    },
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);