import { useEffect, useReducer, useCallback, useMemo } from "react";
import PokemonListing from "../components/pokemonListing/PokemonListing";
import PokemonSearch from "../components/pokemonSearch/PokemonSearch";
import {
  initialPokemonState,
  pokemonReducer,
} from "../reducers/PokemonReducer";
import "./Home.css";
import { fetchPokemons, updateFavorites } from "../utils/functions";

const Home = () => {
  const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPokemons({
        page: 1,
        limit: state.limit,
        searchTerm: state.searchQuery,
        showFav: state.showFavorites,
      });

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          pokemons: data,
        },
      });
    }

    fetchData();
  }, [state.searchQuery, state.showFavorites]);

  const loadMorePokemons = () => {
    const nextPage = state.page + 1;
    async function fetchData() {
      const data = await fetchPokemons({
        page: nextPage,
        limit: state.limit,
        searchTerm: state.searchQuery,
        showFav: state.showFavorites,
      });

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          pokemons: data,
        },
      });
    }
    fetchData();
  };

  const setSearchQuery = useCallback((query) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);

  const setFilterFavorites = useCallback((filter) => {
    dispatch({ type: "TOGGLE_FAVORITE_FILTER", payload: filter });
  }, []);

  const updateFav = useCallback((pokemon) => {
    dispatch({ type: "UPDATE_FAVORITES", payload: pokemon });
    updateFavorites(pokemon);
  }, []);

  // Debounced filter application
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchPokemons({
        page: 1,
        limit: state.limit,
        searchTerm: state.searchQuery,
        showFav: state.showFavorites,
      });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [state.searchQuery, state.showFavorites]);

  const listingProps = useMemo(
    () => ({
      pokemons: state.visiblePokemons,
      updateFav,
      loadMorePokemons,
    }),
    [state.visiblePokemons]
  );

  return (
    <div className="home-container">
      <PokemonSearch
        setSearchQuery={setSearchQuery}
        setFilterFavorites={setFilterFavorites}
        showFavorites={state.showFavorites}
        listingProps={listingProps}
      />
      <PokemonListing {...listingProps} />
    </div>
  );
};

export default Home;
