import types, { Visibility, Weather } from '../types';
import zod from 'zod';

const isString = (value: unknown): value is string => {
    return typeof value === 'string';
};

const parseComment = (comment: unknown): string => {
    return zod.string().parse(comment);
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

export default {
    parseComment,
    parseDate,
    parseWeather,
    parseVisibility
};