import express, { Request, Response } from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
import middleware from '../utils/middleware';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
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

router.post('/', middleware.newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
});

export default router;