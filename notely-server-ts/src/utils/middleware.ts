import { NextFunction, Request, Response } from 'express';
import zod, { ZodError } from 'zod';
import logger from './logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
    logger.info('--- Incoming Request ---');
    logger.info('Method:', req.method);
    logger.info('Path:  ', req.path);
    logger.info('Body:  ', req.body);
    logger.info('------------------------');
    next();
};

const newNote = zod.object({
    content: zod.string(),
    important: zod.boolean().default(false),
});

const noteParseHandler = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newNote.parse(req.body);

        next();
    } catch (err: unknown) {
        next(err);
    }
};

const unknownEndpointHandler = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'Unknown Endpoint' });
};

const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);

    if (err.name === 'CastError') {
        res.status(400).json({ error: 'Malformatted ID' });
        return;
    }
    else if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
        return;
    }
    else if (err instanceof ZodError) {
        res.status(400).send({ error: err.issues });
        return;
    }

    next(err);
};

export default {
    requestLogger,
    noteParseHandler,
    unknownEndpointHandler,
    errorHandler
};