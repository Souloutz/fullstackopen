const mongoose = require('mongoose');
const dotenv = require('dotenv');

if (process.argv.length < 4) {
    console.log('Please specify a name and phone-number!')
    process.exit(1);
}

dotenv.config();

const password = process.env.MONGODB_PASSWORD
const uri = `mongodb+srv://howardkong826:${password}@fullstackopen.q8zxh.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FullStackOpen`;

mongoose.set('strictQuery', false);
mongoose.connect(uri)
.then(console.log('Connected to MongoDB'))
.catch(err => console.log('Could not connect to MongoDB', err));

const userSchema = mongoose.Schema({
    name: String,
    number: String,
});

const User = mongoose.model('User', userSchema);

const name = process.argv[2];
const number = process.argv[3];
const user = new User({ name, number })

user.save()
.then(result => {
    console.log(`Added { name: '${result.name}', number: '${result.number}' } to phonebook`);
    mongoose.connection.close();
})
.catch(err => {
    console.log('Error saving user:', err);
    mongoose.connection.close();
});
