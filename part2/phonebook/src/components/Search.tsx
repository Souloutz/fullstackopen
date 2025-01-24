type Props = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (value: string) => void;
}

const Search: React.FC<Props> = ({ setSearch, handleSearch }) => {
    return (
        <div>
            Search Filter: 
            <input onChange={e => {
                const newSearch = e.target.value;
                setSearch(newSearch);
                handleSearch(newSearch);
            }} />
        </div>
    );
}

export default Search;