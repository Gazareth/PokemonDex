import { combineReducers } from "redux";
import pokemon from "./pokemonReducer";
import theme from "./themeReducer";

export default combineReducers({
  pokemon,
  theme
});
