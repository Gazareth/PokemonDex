import { THEME } from "../actions/types";

const defaultTheme = Object.freeze({
  mode: "light"
});

const themeReducer = (state = defaultTheme, action) => {
  switch (action.type) {
    case THEME.SET_DARK_MODE:
      return { ...state, mode: "dark" };
    case THEME.SET_LIGHT_MODE:
      return { ...state, mode: "light" };
    default:
      return state;
  }
};

export default themeReducer;
