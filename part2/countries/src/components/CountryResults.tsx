import { useEffect, useRef, useState } from "react";
import { Country } from "../services/countries";
import CountryInfo from "./CountryInfo";
import weatherService, { Weather } from "../services/weather";

type Props = {
    countries: Country[];
}

const CountryResult: React.FC<Props> =({ countries }) => {
    const [shown, setShown] = useState<boolean[]>(countries.map(_ => false));
    const [weather, setWeather] = useState<(Weather | null)[]>(countries.map(_ => null));

    // Cache API responses to reduce calls 
    const weatherCache = useRef(new Map());

    // Get weather for country through weather service
    const fetchWeather = async(country: Country): Promise<Weather> => {
        if (weatherCache.current.has(country.name)) {
            return weatherCache.current.get(country.name);
        }

        const fetchedWeather = await weatherService.getWeather(country);
        const generatedWeather = weatherService.generateWeather(fetchedWeather);
        
        weatherCache.current.set(country.name, generatedWeather);
        return generatedWeather;
    };

    // Update weather state
    const updateWeather = (index: number) => {
        const weatherCopy = [...weather];
        fetchWeather(countries[index]).then(countryWeather => {
            weatherCopy[index] = countryWeather;
            setWeather(weatherCopy);
        });
    }

    // Handle showing/unshowing of each country's info
    const handleShow = (index: number): void => {
        const shownCopy = [...shown];
        shownCopy[index] = !shownCopy[index];
        setShown(shownCopy);

        if (shownCopy[index]) {
            updateWeather(index);
        }
    };

    useEffect(() => {
        if (countries.length === 1 && !weather[0])
            updateWeather(0);
    }, [countries])

    return (
        <div style={{ marginTop: '2em' }}>
            {
                countries.length === 1 ?
                    <CountryInfo country={countries[0]} countryWeather={weather[0]}/> : 

                countries.length > 10 ? 
                    <p style={{ marginTop: '4em' }}>Total many matches! Please narrow your search.</p> : 

                    countries.map((filtered, index) => 
                        <div key={index}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '15rem', marginLeft: 'auto', marginRight: 'auto' }}>
                                <p style={{ textAlign: 'left' }}>{filtered.name}</p>
                                
                                <button style={{ fontSize: '0.8rem', height: 'fit-content' }} onClick={() => handleShow(index)}>
                                    {shown[index] ? 'Hide' : 'Show'}
                                </button>
                            </div>
                
                            {shown[index] ? <CountryInfo country={filtered} countryWeather={weather[index]} /> : <></>}
                        </div>
                    )
            }
        </div>
    );
};

export default CountryResult;