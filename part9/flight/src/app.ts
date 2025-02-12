import express, { Request, Response } from 'express';
import morgan from 'morgan';
import diaryRouter from './routes/diaries';
import middleware from './utils/middleware';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.get('/ping', (_req: Request, res: Response) => {
    console.log('Someone pinged the server.');
    res.send('Pong!');
});

app.use('/api/diaries', diaryRouter);

app.use(middleware.unknownEndpoint);

export default app;