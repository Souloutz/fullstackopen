import zod from 'zod';
import newEntrySchema from './utils/utility';

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy'
};

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor'
};

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type NewDiaryEntry = zod.infer<typeof newEntrySchema>;
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;