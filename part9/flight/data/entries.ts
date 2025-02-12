import fs from 'fs';
import path from 'path';
import { DiaryEntry, Visibility, Weather } from "../src/types"
import entries from './diaryEntries.json';
import logger from '../src/utils/logger';

// Requires JSON to be in correct format
const diaryEntries: DiaryEntry[] = entries.map(({ date, weather, visibility, comment }) => {
    return ({
        date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment
    }) as DiaryEntry;
});

export const save = (entries: DiaryEntry[]) => {
    const filePath = path.resolve(__dirname, "diaryEntries.json")

    try {
        fs.writeFileSync(filePath, JSON.stringify(entries, null, 4));
        logger.info('Successfully written to file');
    } catch (err: any) {
        logger.error('Error writing to file:', err);
    }
};

export default diaryEntries;