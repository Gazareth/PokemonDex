// postReducer.js

import { SEARCH_POKEMON } from "../actions/types";

//Default store
const pokemonDefaultState = Object.freeze({
  data: {},
  searching: 0,
  haveData: 0,
});

const pokemonReducer = (
  state = { loading: SEARCH_POKEMON.NONE, ...pokemonDefaultState },
  action
) => {
  const loadingUpdate = () => ({
    ...state,
    loading: action.type,
  });

  switch (action.type) {
    case SEARCH_POKEMON.NONE:
    case SEARCH_POKEMON.INIT:
    case SEARCH_POKEMON.SPECIES_FOUND:
    case SEARCH_POKEMON.MOVES_FOUND:
    case SEARCH_POKEMON.FAILED:
      return loadingUpdate();
    case SEARCH_POKEMON.FOUND:
      return {
        ...pokemonDefaultState, // wipes data & ids
        loading: action.type,
        searching: action.payload,
      };
    case SEARCH_POKEMON.DONE:
      return {
        ...state,
        loading: SEARCH_POKEMON.DONE,
        data: action.payload,
        haveData: action.payload.id,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
