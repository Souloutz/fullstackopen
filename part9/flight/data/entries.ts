import fs from 'fs';
import path from 'path';
import { DiaryEntry } from '../src/types';
import diaryService from '../src/services/diaryService';
import entries from './diaryEntries.json';
import logger from '../src/utils/logger';

// Requires JSON to be in correct format
const diaryEntries: DiaryEntry[] = entries.map((obj) => {
    const diaryEntry = diaryService.toNewDiaryEntry(obj) as DiaryEntry;
    diaryEntry.id = Number(obj.id);
    return diaryEntry;
});

export const save = (entries: DiaryEntry[]) => {
    const filePath = path.resolve(__dirname, 'diaryEntries.json');

    try {
        fs.writeFileSync(filePath, JSON.stringify(entries, null, 4));
        logger.info('Successfully written to file');
    } catch (err: unknown) {
        let errMessage = 'Something went wrong.';
        if (err instanceof Error)
            errMessage += `Error writing to file: ${err.message}`;

        logger.error(errMessage);
    }
};

export default diaryEntries;