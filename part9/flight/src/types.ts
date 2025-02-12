const weatherTypes = ['sunny', 'rainy', 'cloudy', 'windy', 'stormy']
export type Weather = typeof weatherTypes[number];

const visibilityTypes = ['great', 'good', 'ok', 'poor'];
export type Visibility = typeof visibilityTypes[number];

const isWeather = (value: string): value is Weather => {
    return weatherTypes.reduce((acc, cur) => acc || (cur === value), false);
}

const isVisibility = (value: string): value is Visibility => {
    return visibilityTypes.reduce((acc, cur) => acc || (cur === value), false);
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export default {
    isWeather,
    isVisibility
}