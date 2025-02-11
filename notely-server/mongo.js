const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(uri)
    .then(console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

if (require.main === module) {
    const note = new Note({
        content: process.argv[2],
        important: process.argv[3],
    });

    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note);
        })
        mongoose.connection.close();
    });

    note.save()
        .then(() => {
            console.log('Note saved!');
            mongoose.connection.close();
        })
        .catch(err => {
            console.log('Error saving note:', err);
            mongoose.connection.close();
        });
}