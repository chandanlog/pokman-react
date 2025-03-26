import PropTypes from "prop-types";
import { useState } from "react";
import "./PokemonSearch.css";

const PokemonSearch = ({ setSearchQuery, setFilterFavorites,showFavorites }) => {
    const [query, setQuery] = useState("");

    const handleSearchChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setSearchQuery(newQuery);
    };

    return (
        <div className="search-section">
            <div className="search-box">
                <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search Pokémon..."
                        value={query}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button type="button" onClick={()=>{
                        setFilterFavorites()
                        setQuery('')
                    }} className="search-button">
                      {showFavorites ? '  Show All' : 'Show Favorites'}
                    </button>
                </form>
                <div className="example-search">
                    <p>Try searching:</p>
                    {["Pikachu", "Charmander"].map((name) => (
                        <button 
                            key={name} 
                            type="button" 
                            value={name}
                            onClick={handleSearchChange} 
                            className="search-example-btn"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

PokemonSearch.propTypes = {
    setSearchQuery: PropTypes.func.isRequired,
    setFilterFavorites: PropTypes.func.isRequired,
};

export default PokemonSearch;
