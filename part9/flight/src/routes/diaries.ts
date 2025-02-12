import express, { Request, Response } from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
   res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (_req: Request, res: Response) => {
    res.send('Saving a diary!');
});

export default router;