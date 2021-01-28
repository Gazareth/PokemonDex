import { SEARCH_POKEMON, THEME, FAVOURITES } from "../actions/types";

import pick from "Utils/pick";

const values = (obj) => Object.keys(obj).map((key) => obj[key]);

const favouritesActions = values(pick(FAVOURITES, ["ADD", "COMMIT_REORDER"]));

const saveActions = [
  SEARCH_POKEMON.DONE,
  ...values(THEME),
  ...favouritesActions,
];

const saveState = (store) => (next) => (action) => {
  try {
    if (saveActions.includes(action.type)) {
      let result = next(action);
      const state = store.getState();

      // use current store state to set values
      let pickedState = {
        pokemon: { data: state.pokemon.data, haveData: state.pokemon.haveData },
        favourites: { favourites: state.favourites.favourites },
        theme: { mode: state.theme.mode },
      };
      const serializedState = JSON.stringify(pickedState);
      localStorage.setItem("state", serializedState);
      return result;
    }
  } catch (err) {
    console.log("Failed to update cache -- ", err);
  }
  return next(action);
};

export default saveState;
