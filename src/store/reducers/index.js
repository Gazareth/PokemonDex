import { combineReducers } from "redux";
import pokemon from "./pokemonReducer";
import favourites from "./favouritesReducer";
import theme from "./themeReducer";

export default combineReducers({
  pokemon,
  favourites,
  theme
});
