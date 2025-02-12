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
    try {
        const newDiaryEntry = diaryService.toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);

        res.json(addedEntry);
    } catch (err: unknown) {
        let errMessage = 'Something went wrong.';
        if (err instanceof Error)
            errMessage += ` Error: ${err.message}`;

        res.status(400).send(errMessage);
    }
});

export default router;