// postReducer.js

import { SEARCH_POKEMON } from "../actions/types";

//Default store
const pokemonInitialState = {
  data: {},
  searching: 0,
  haveData: 0,
  loading: SEARCH_POKEMON.NONE,
};

const pokemonReducer = (
  state = { loading: SEARCH_POKEMON.NONE, ...pokemonInitialState },
  action
) => {
  const loadingUpdate = () => ({
    ...state,
    loading: action.type,
  });

  if (!state.hydrated) {
    state = { ...pokemonInitialState, ...state, hydrated: true };
  }

  switch (action.type) {
    case SEARCH_POKEMON.NONE:
      return { ...loadingUpdate(), searching: 0 };
    case SEARCH_POKEMON.INIT:
    case SEARCH_POKEMON.VARIETY_FOUND:
    case SEARCH_POKEMON.EVOLUTION_CHAIN_FOUND:
    case SEARCH_POKEMON.EVOLUTIONS_FOUND:
    case SEARCH_POKEMON.MOVES_FOUND:
    case SEARCH_POKEMON.FAILED:
      return loadingUpdate();
    case SEARCH_POKEMON.FOUND:
      return {
        ...pokemonInitialState, // wipes data & ids
        loading: action.type,
        data: { name: action.payload.name, id: action.payload.id },
        searching: action.payload.id,
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
