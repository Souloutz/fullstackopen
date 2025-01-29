import { useEffect, useState } from 'react';
import './App.css'
import countriesService from './services/countries';
import { Country } from './services/countries';
import Search from './components/Search';
import CountryResult from './components/CountryResults';

const App = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [search, setSearch] = useState('');
    
    const fetchCountries = async() => {
        const fetchedCountries = await countriesService.fetchCountries();
        return fetchedCountries.map((country: any) => countriesService.generateCountry(country));
    };
    useEffect(() => {
        fetchCountries().then(setCountries);
    }, []);

    const searchedCountries: Country[] = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <div>
        <Search handleSearch={setSearch} />
        <CountryResult countries={searchedCountries} />
        </div>
    );
}

export default App
