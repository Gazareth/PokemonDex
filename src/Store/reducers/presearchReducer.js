import { PRESEARCH_POKEMON } from "../actions/types";

//Default store
const pokemonInitialState = {
  count: 0,
  loading: PRESEARCH_POKEMON.NONE,
};

const pokemonReducer = (
  state = { loading: PRESEARCH_POKEMON.NONE, ...pokemonInitialState },
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
    case PRESEARCH_POKEMON.NONE:
      return { ...loadingUpdate(), count: 0 };
    case PRESEARCH_POKEMON.INIT:
    case PRESEARCH_POKEMON.FAILED:
      return loadingUpdate();
    case PRESEARCH_POKEMON.DONE:
      return {
        ...pokemonInitialState, // wipes data & ids
        loading: action.type,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
