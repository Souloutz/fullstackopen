import { Country } from "../services/countries";
import { Weather } from "../services/weather";

type Props = {
    country: Country;
    countryWeather: Weather | null;
}

const CountryInfo: React.FC<Props> = ({ country, countryWeather }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4em' }}>
                <div>
                    <h1>{country.name}</h1>
                    <div>
                        <p>Capital: {country.capital !== undefined ? country.capital : 'No capital'}</p>
                        <p>Area: {country.area}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2>Languages</h2>
                            <ul style={{ textAlign: 'left', paddingLeft: 0, marginTop: 0 }}>
                            {
                            country.languages !== undefined && country.languages.length > 0 ? 
                                country.languages.map(language => <li key={language}>{language}</li>) :
                                <p>No known spoken languages.</p>
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <img style={{ margin: '0 0', paddingTop: 0, width: '15rem', height: 'auto', alignSelf: 'center' }} src={country.flags.svg} alt={country.flags.alt} />
            </div>
            <div>
                <h2>Weather in {country.name}</h2>
                <p>Temperature: {countryWeather?.temp} &deg;C</p>
                <img src={`https://openweathermap.org/img/wn/${countryWeather?.weather.icon}@2x.png`} />
                <p>Wind: {countryWeather?.wind.speed} m/s</p>
            </div>
        </div>
    );
};

export default CountryInfo;