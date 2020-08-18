import { SEARCH_POKEMON, THEME, FAVOURITES } from "../actions/types";

import pick from "Utils/pick";

const values = (obj) => Object.keys(obj).map((key) => obj[key]);

const favouritesActions = values(
  pick(FAVOURITES, [
    "ADD_FAVOURITE",
    "DELETE_FAVOURITE",
    "COMMIT_REORDER_FAVOURITES",
  ])
);

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
        favourites: { favouritesOrder: state.favourites.favouritesOrder },
        theme: { mode: state.theme.mode },
      };

      const serializedState = JSON.stringify(pickedState);
      localStorage.setItem("state", serializedState);
      return result;
    }
  } catch (err) {}
  return next(action);
};

export default saveState;
