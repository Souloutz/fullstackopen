const mongoose = require('mongoose');

if (process.argv.length < 4) {
    console.log('Please specify a name and phone-number!');
    process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url)
    .then(console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const personSchema = mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

const name = process.argv[2];
const number = process.argv[3];
const person = new Person({ name, number });

person.save()
    .then(result => {
        console.log(`Added { name: '${result.name}', number: '${result.number}' } to phonebook`);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('Error saving user:', err);
        mongoose.connection.close();
    });
