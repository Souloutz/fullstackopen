import axios from "axios";
import { Country } from "./countries";

export interface Weather {
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    },
    temp: number;
    wind: {
        speed: number;
    }   
}

const generateWeather = (weather: any) => {
    const countryWeather: Weather = {
        weather: {
            id: weather.weather[0].id,
            main: weather.weather[0].main,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon
        },
        temp: weather.main.temp,
        wind: {
            speed: weather.wind.speed
        }
    }
    return countryWeather;
}

const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

const getWeather = async(country: Country) => {
    const response = axios.get(`${baseURL}lat=${country.coords.latitude}&lon=${country.coords.longitude}&appid=${apiKey}`);
    return (await response).data;
};

export default { getWeather, generateWeather };