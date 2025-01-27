import { Country } from "../services/country_struct";

type Props = {
    country: Country;
}

const CountryInfo: React.FC<Props> = ({ country }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4em' }}>
            <div>
                <h1>{country.name}</h1>
                <div>
                    <p>Capital: {country.capital !== undefined ? country.capital : 'No capital'}</p>
                    <p>Area: {country.area}</p>

                    <h2>Languages</h2>
                    {country.languages !== undefined && country.languages.length > 0 ? 
                    <ul style={{ textAlign: 'left' }}>
                        {country.languages.map(language => <li>{language}</li>)}
                    </ul>
                    : <p>No known spoken languages.</p>}
                </div>
            </div>
            <img style={{ marginTop: '2em', width: '30%' }} src={country.flags.svg} alt={country.flags.alt} />
        </div>
    );
};

export default CountryInfo;