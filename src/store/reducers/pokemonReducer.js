// postReducer.js

import { SEARCH_POKEMON } from "../actions/types";

//Default store
const pokemonData = Object.freeze({
  data: {},
  species: {},
  moves: {},
  haveData: false
});

const pokemonReducer = (
  state = { loading: SEARCH_POKEMON.NONE, ...pokemonData },
  action
) => {
  const stateUpdater = dataKey => ({
    ...state,
    loading: action.type,
    [dataKey]: action.payload
  });

  switch (action.type) {
    case SEARCH_POKEMON.NONE:
      return { ...state, loading: SEARCH_POKEMON.NONE };
    case SEARCH_POKEMON.INIT:
      return { ...state, loading: SEARCH_POKEMON.INIT };
    case SEARCH_POKEMON.FOUND:
      return stateUpdater("data");
    case SEARCH_POKEMON.SPECIES_FOUND:
      return stateUpdater("species");
    case SEARCH_POKEMON.MOVES_FOUND:
      return stateUpdater("moves");
    case SEARCH_POKEMON.DONE:
      return { ...state, loading: SEARCH_POKEMON.DONE, haveData: true };
    case SEARCH_POKEMON.FAILED:
      return { ...state, loading: action.type };
    default:
      return state;
  }
};

export default pokemonReducer;
