import diaries, { save } from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types';

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

const addDiary = (date: string, weather: Weather, visibility: Visibility, comment: string): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(0, ...diaries.map(d => d.id)) + 1,
        date,
        weather,
        visibility,
        comment
    };

    diaries.push(newDiaryEntry);
    save(diaries);
    return newDiaryEntry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
}