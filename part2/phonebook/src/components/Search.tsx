type Props = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<Props> = ({ setSearch, setShowAll }) => {
    return (
        <div>
            Search Filter: 
            <input onChange={e => {
                const newSearch = e.target.value;
                setSearch(newSearch);
                if (newSearch.length !== 0)
                    setShowAll(false);
                else
                    setShowAll(true);
            }} />
        </div>
    );
}

export default Search;