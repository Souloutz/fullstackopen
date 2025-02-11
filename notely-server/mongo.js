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