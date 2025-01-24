type Props = {
    handleSearch: (value: string) => void;
}

const Search: React.FC<Props> = ({ handleSearch }) => {
    return (
        <div>
            Search Filter: <input onChange={e => handleSearch(e.target.value)} />
        </div>
    );
}

export default Search;