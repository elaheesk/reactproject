import '../searchBar.css';
import { ISearchBarProps } from "../type";

const SearchBar: React.FC<ISearchBarProps> = ({
    suggestions,
    hideSuggestions,
    value,
    setValue,
    findResult
}) => {
    return (
        <div>
            <input
                type="text"
                className="textbox"
                placeholder="Search data..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <div className="suggestions">
                {suggestions.map((suggestion) => (
                    <div
                        onClick={() => findResult(suggestion.title)}
                        className="suggestion"
                        style={{
                            display: hideSuggestions ? "none" : "block"
                        }}

                        key={suggestion.id}>
                        {suggestion['title']}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SearchBar;