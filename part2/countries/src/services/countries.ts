import axios from "axios";

export interface Country {
    name: string;
    capital?: string;
    area: number;
    languages?: string[];
    flags: Flags;
    coords: {
        latitude: number;
        longitude: number;
    }
}

interface Flags {
    png: string
    svg: string
    alt?: string
}

const generateCountry = (country: any): Country => {
    const countryInfo: Country = {
        name: country.name.common,
        area: country.area,
        flags: {
            png: country.flags.png,
            svg: country.flags.svg,
            alt: country.flags.alt
        },
        coords: {
            latitude: country.latlng[0],
            longitude: country.latlng[1]
        }
    }

    if (country.capital !== undefined) {
        countryInfo.capital = country.capital;
    }

    if (country.languages !== undefined) {
        countryInfo.languages = Object.values(country.languages);
    }

    return countryInfo;
};

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api';

const fetchCountries = async() => {
    const response = axios.get(`${baseURL}/all`);
    return (await response).data;
};

const fetchCountry = async(countryName: string) => {
    const response = axios.get(`${baseURL}/name/${countryName}`);
    return (await response).data;
}

export default { fetchCountries, fetchCountry, generateCountry };