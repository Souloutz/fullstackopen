require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import calculateBMI from './bmiCalculator';
import utils from './utils/parse';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('tiny'));

app.get('/ping', (_req, res) => {
    res.send('Pong!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query['height']);
    const weight = Number(req.query['weight']);
    const type = req.query['type'];

    if (!isNaN(height) && !isNaN(weight) && utils.isSystem(type)) {
        const bmi = calculateBMI(height, weight, type);
        res.status(200).json({ BMI: bmi });
    }

    res.status(400).json({ error: "Query parameters invalid" });
});

const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).json({ error: "Unknown endpoint" });
};
app.use(unknownEndpoint);


const errorHandler = (err: Error, _req: Request, _res: Response, next: NextFunction) => {
    console.log(err.message)

    next(err)
};
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});