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

const isWeather = (value: string): value is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(value);
};

const isVisibility = (value: string): value is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(value);
};

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export default {
    isWeather,
    isVisibility
};