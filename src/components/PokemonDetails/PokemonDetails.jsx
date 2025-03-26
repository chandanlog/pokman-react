import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./PokemonDetails.css";

const PokemonDetails = ({ pokemon, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  const chartData = {
    labels: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
    datasets: [
      {
        label: "Stats",
        data: [
          Number(pokemon.hp),
          Number(pokemon.attack),
          Number(pokemon.defense),
          Number(pokemon.special_attack),
          Number(pokemon.special_defense),
          Number(pokemon.speed),
        ],
        backgroundColor: [
          "#ff5733",
          "#33b5ff",
          "#33ff57",
          "#ff33a1",
          "#ffea33",
          "#9933ff",
        ],
        borderRadius: 10,
      },
    ],
  };

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>

            <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>

            {/* Flip Card for Pokémon Image */}
            <motion.div
              className="pokemon-image-container"
              onClick={() => setFlipped(!flipped)}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={flipped ? pokemon.back_image : pokemon.front_image}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </motion.div>

            <p className="pokemon-type">
              <strong>Type:</strong> {pokemon.type.join(", ")}
            </p>

            <div className="pokemon-chart">
              <Bar data={chartData} options={{ responsive: true }} />
            </div>

            {pokemon.evolution && pokemon.evolution.length > 1 && (
              <div className="pokemon-evolution">
                <strong>Evolution Chain:</strong>
                <ul>
                  {pokemon.evolution.map((evo) => (
                    <li key={evo}>{evo}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PokemonDetails.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    front_image: PropTypes.string.isRequired,
    back_image: PropTypes.string.isRequired,
    hp: PropTypes.string,
    attack: PropTypes.string,
    defense: PropTypes.string,
    special_attack: PropTypes.string,
    special_defense: PropTypes.string,
    speed: PropTypes.string,
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
    evolution: PropTypes.array,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PokemonDetails;
