import mongoose, { Error, Model } from 'mongoose';

const uri = process.env.MONGODB_URI;

if (typeof uri !== 'string') {
    console.error('MongoDB URI not found');
    process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: Error) => console.log('Could not connect to MongoDB', err));

interface NoteDocument extends mongoose.Document {
    content: string;
    important: boolean;
}

const noteSchema = new mongoose.Schema<NoteDocument>({
    content: String,
    important: Boolean,
});

const Note: Model<NoteDocument> = mongoose.model<NoteDocument>('Note', noteSchema);

if (require.main === module) {
    const note = new Note({
        content: process.argv[2],
        important: process.argv[3],
    });

    Note.find({})
        .then(result => {
            result.forEach(note => {
                console.log(note);
            });

        })
        .catch((err: Error) => console.error(err.message));

    note.save()
        .then(() => {
            console.log('Note saved!');
        })
        .catch(err => {
            console.log('Error saving note:', err);
        });

    mongoose.connection.close()
        .then(() => console.log('Connection closed'))
        .catch((err: Error) => console.error(`Error: ${err.message}`));
}