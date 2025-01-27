import { useState } from "react";
import { Country } from "../services/country_struct"
import CountryInfo from "./CountryInfo";

type Props = {
    countries: Country[]
}

const CountryResult: React.FC<Props> =({ countries }) => {
    const [shown, setShown] = useState<boolean[]>(countries.map(_ => false));

    const handleShow = (index: number): void => {
        const copy = [...shown];
        copy[index] = !copy[index];
        setShown(copy);
    };

    return (
        <div style={{ marginTop: '2em' }}>
            {
                countries.length === 1 ?
                    <CountryInfo country={countries[0]} /> : 

                countries.length > 10 ? 
                    <p style={{ marginTop: '4em' }}>Total many matches! Please narrow your search.</p> : 

                    countries.map((filtered, index) => 
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p key={filtered.name}>{filtered.name}</p>
                            
                            <button style={{ fontSize: '0.8rem', height: 'fit-content' }} onClick={() => handleShow(index)}>
                                {shown[index] ? 'Hide' : 'Show'}
                            </button>

                            {shown[index] ? <CountryInfo country={filtered} /> : <></>}
                        </div>
                    )
            }
        </div>
    );
};

export default CountryResult;