import { NextFunction, Request, Response } from 'express';
import newEntrySchema from './utility';
import { ZodError } from 'zod';

const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send('Unknown Endpoint');
};

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        next();
    } catch (err: unknown) {
        next(err);
    }
};

const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).send({ error: err.issues });
        return;
    }

    next(err);
};

export default { newDiaryParser, unknownEndpoint, errorHandler };