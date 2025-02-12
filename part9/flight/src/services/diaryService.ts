import diaries, { save } from '../../data/entries';
import types, { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types';

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

const isString = (value: unknown): value is string => {
    return typeof value === 'string';
};

const parseComment = (comment: unknown): string => {
    if (!isString(comment))
        throw new Error('Incorrect or missing comment');

    return comment;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date))
        throw new Error(`Incorrect or missing date: ${date}`);

    return date;
};

const parseWeather = (weather: unknown): Weather => {
    if (!isString(weather) || !types.isWeather(weather))
        throw new Error(`Incorrect or missing weather: ${weather}`);

    return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!isString(visibility) || !types.isVisibility(visibility))
        throw new Error(`Incorrect or missing visibility: ${visibility}`);

    return visibility;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== 'object')
        throw new Error('Data is not an object');

    if ('date' in object &&
        'weather' in object &&
        'visibility' in object
    ) {
        const comment = 'comment' in object ? parseComment(object.comment) : undefined;
        const newEntry: NewDiaryEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
        };

        if (comment)
            newEntry.comment = comment;

        return newEntry;
    }

    throw new Error('Incorrect data: missing fields');
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
    toNewDiaryEntry
};