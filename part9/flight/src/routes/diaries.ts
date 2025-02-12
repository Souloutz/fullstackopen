import express, { Request, Response } from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from '../types';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitiveDiaryEntry[   ]>) => {
   res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (!diary) {
        res.status(404).end();
        return;
    }

    res.send(diary);
});

router.post('/', (req: Request, res: Response) => {
    const { date, weather, visibility, comment } = req.body;
    const addedEntry = diaryService.addDiary(
        date, weather, visibility, comment
    );

    res.json(addedEntry);
});

export default router;