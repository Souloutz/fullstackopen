type Props = {
    handleSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<Props> = ({ handleSearch }) => {
    return (
        <div>
            <label>Search Country: </label>
            <input type="text" onChange={e => handleSearch(e.target.value)} />
        </div>
    );
};

export default Search;