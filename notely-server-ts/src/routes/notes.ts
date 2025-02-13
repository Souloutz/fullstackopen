import express, { Request, Response } from 'express';
import Note, { NoteType } from '../models/note';
import { Document } from 'mongoose';
import middleware from '../utils/middleware';

const notesRouter = express.Router();

notesRouter.get('/', (_req, res: Response<Document[]>, next) => {
    Note.find({})
        .then(notes => {
            res.json(notes);
        })
        .catch((err: Error) => next(err));
});

notesRouter.get('/:id', (req, res: Response<Document>, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note === null)
                return res.sendStatus(404);

            return res.json(note);
        })
        .catch(err => next(err));
});

notesRouter.post('/', middleware.noteParseHandler, (req: Request<unknown, unknown, NoteType>, res: Response<Document>, next) => {
    const newNote = new Note(req.body);

    newNote.save()
        .then(savedNote => {
            res.json(savedNote);
        })
        .catch(err => next(err));
});

notesRouter.put('/:id', middleware.noteParseHandler, (req: Request<{ id: string }, unknown, NoteType>, res: Response<Document>, next) => {
    const { content, important } = new Note(req.body);

    Note.findByIdAndUpdate(
        req.params.id,
        { content, important, updatedAt: Date.now() },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => {
            if (updatedNote === null)
                return res.sendStatus(500);

            return res.json(updatedNote);
        })
        .catch(err => next(err));
});

notesRouter.delete('/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => next(err));
});

export default notesRouter;
