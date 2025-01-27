import { Country } from "../services/country_struct"
import CountryInfo from "./CountryInfo";

type Props = {
    countries: Country[]
}

const CountryResult: React.FC<Props> =({ countries }) => {
    return (
        <div style={{ marginTop: '2em' }}>
            {
                countries.length === 1 ?
                    <CountryInfo country={countries[0]} /> : 

                countries.length > 10 ? 
                    <p style={{ marginTop: '4em' }}>Total many matches! Please narrow your search.</p> : 
                    countries.map(filtered => <p key={filtered.name}>{filtered.name}</p>)
            }
        </div>
    );
};

export default CountryResult;