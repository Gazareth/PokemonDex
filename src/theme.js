import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {
  grey,
  red,
  blue,
  green,
  yellow,
  lightBlue,
  deepOrange,
  purple,
  brown,
  blueGrey,
  pink,
  lime,
  orange,
  indigo,
  deepPurple
} from "@material-ui/core/colors";

const pokemonTypeShade = () => (darkLight === "dark" ? 300 : 600);

const pokemonTypeMap = {
  Normal: grey,
  Fire: red,
  Water: blue,
  Grass: green,
  Electric: yellow,
  Ice: lightBlue,
  Fighting: deepOrange,
  Poison: purple,
  Ground: brown,
  Flying: blueGrey,
  Psychic: pink,
  Bug: lime,
  Rock: orange,
  Ghost: indigo,
  Dark: grey,
  Dragon: deepPurple,
  Steel: grey,
  Fairy: pink
};

// Normal: grey[pokemonTypeShade(darkLight)],

const pokemonTypeColours = darkLight =>
  Object.keys(pokemonTypeMap).reduce(
    (colsObj, colKey) => ({
      ...colsObj,
      [colKey]: pokemonTypeMap[colKey][pokemonTypeShade(darkLight)]
    }),
    {}
  );

const darkLight = 0 ? "dark" : "light";

const backgrounds = darkLight =>
  [
    {
      default: "#fff",
      secondary: "#f5f5f5",
      tertiary: "#eee",
      quaternary: "#e0e0e0",
      quinary: "#ccc",
      senary: "#bdbdbd"
      //septenary, octonary, nonary, and denary
    },
    {
      default: "#121212",
      secondary: "#212121",
      tertiary: "#2b2b2b",
      quaternary: "#333",
      quinary: "#393939",
      senary: "#424242",
      septenary: "#616161",
      octonary: "#757575"
    }
  ][darkLight === "light" ? 0 : 1];

export let theme = createMuiTheme({
  palette: {
    type: darkLight,
    primary: {
      light: "#a6d4fa",
      main: "#90caf9",
      dark: "#648dae",
      contrastText: "#fff"
    },
    background: { ...backgrounds(darkLight) },
    pokemonTypes: pokemonTypeColours(darkLight)
  }
});

console.log("THEME: ", theme);
