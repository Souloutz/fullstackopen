import { Request, Response } from 'express';

const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send('Unknown Endpoint');
};

export default { unknownEndpoint };