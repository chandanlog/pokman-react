export const initialPokemonState = {
  visiblePokemons: [],
  searchQuery: "",
  filterFavorites: false,
  showFavorites: false,
  page: 1,
  totalCount: 0,
  limit: 20,
};

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      let visiblePokemons = [];
      if (state.page === 1) {
        visiblePokemons = action.payload.pokemons;
      } else {
        visiblePokemons = [
          ...state.visiblePokemons,
          ...action.payload.pokemons,
        ];
      }

      return {
        ...state,
        visiblePokemons: visiblePokemons && [...visiblePokemons],
        page: state.page + 1,
      };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, page: 1 };

    case "TOGGLE_FAVORITE_FILTER":
      return {
        ...state,
        showFavorites: !state.showFavorites,
        page: 1,
      };

    case "UPDATE_FAVORITES":
      const updatedList = state.visiblePokemons.map((p) =>
        p.id === action.payload?.id
          ? {
              ...p,
              is_favourite: p.is_favourite === "1" ? "0" : "1",
            }
          : p
      );
      return {
        ...state,
        visiblePokemons: updatedList,
      };

    default:
      return state;
  }
};
