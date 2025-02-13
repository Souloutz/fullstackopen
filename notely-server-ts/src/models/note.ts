import { InferSchemaType, model, Schema } from 'mongoose';

const noteSchema = new Schema({
    content: {
        type: String,
        minLength: 5,
        required: true,
    },
    important: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export type NoteType = InferSchemaType<typeof noteSchema>;

export default model('Note', noteSchema);