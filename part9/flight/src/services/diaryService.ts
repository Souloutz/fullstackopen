import zod from 'zod';
import diaries, { save } from '../../data/entries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types';

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(0, ...diaries.map(d => d.id)) + 1,
        ...entry
    };

    diaries.push(newDiaryEntry);
    save(diaries);
    return newDiaryEntry;
};

const newEntrySchema = zod.object({
    weather: zod.nativeEnum(Weather),
    visibility: zod.nativeEnum(Visibility),
    date: zod.string().date(),
    comment: zod.string().optional()
});

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    return newEntrySchema.parse(object);
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
    toNewDiaryEntry
};