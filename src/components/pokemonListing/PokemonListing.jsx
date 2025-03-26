import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import "./PokemonListing.css";

const PokemonListing = ({ pokemons, updateFav, loadMorePokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView) {
      if (pokemons.length < 140) {
        loadMorePokemons();
      }
    }
  }, [inView]);

  return (
    <div className="list-container">
      <div className="pokemon-grid">
        {pokemons?.length > 0 ? (
          pokemons?.map((pokemon, index) => (
            <motion.div
              key={`${pokemon.id || index}-${pokemon.name}`}
              className="pokemon-card"
              onClick={() => setSelectedPokemon(pokemon)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              ref={index === pokemons.length - 1 ? ref : null}
            >
              <img
                src={pokemon.front_image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <div className="pokemon-info">
                <p className="pokemon-name">{pokemon.name}</p>
                <motion.button
                  className={`fav-button ${
                    pokemon?.is_favourite === "1" ? "" : "active"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateFav(pokemon);
                  }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  ♥
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Fetching Pokemons...</p>
        )}
      </div>

      <AnimatePresence>
        {selectedPokemon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="pokemon-modal-overlay"
          >
            <PokemonDetails
              pokemon={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

PokemonListing.propTypes = {
  pokemons: PropTypes.array.isRequired,
  updateFav: PropTypes.func.isRequired,
  loadMorePokemons: PropTypes.func.isRequired,
};

export default PokemonListing;
