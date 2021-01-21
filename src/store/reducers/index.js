import { combineReducers } from "redux";
import presearch from "./presearchReducer";
import pokemon from "./pokemonReducer";
import favourites from "./favouritesReducer";
import theme from "./themeReducer";

export default combineReducers({
  presearch,
  pokemon,
  favourites,
  theme,
});
