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
      senary: "#bdbdbd",
      septenary: "#9e9e9e",
      octonary: "#757575",
      nonary: "#616161",
      denary: "#424242",
      eleven: "#212121"
    },
    {
      default: "#121212",
      secondary: "#212121",
      tertiary: "#2b2b2b",
      quaternary: "#333",
      quinary: "#393939",
      senary: "#424242",
      septenary: "#616161",
      octonary: "#757575",
      nonary: "#9e9e9e",
      denary: "#bdbdbd",
      eleven: "#000"
    }
  ][darkLight === "light" ? 0 : 1];

const buildTransition = (
  theme,
  props //[prop,duration,delay,easing]
) => {
  const propsArr = Array.isArray(props)
    ? Array.isArray(props[0])
      ? props
      : [props]
    : [[props]];
  const trsn = theme.transitions;
  return {
    transition: propsArr
      .map(p => {
        const [
          prop,
          duration = trsn.duration.standard,
          delay = 0,
          easing = trsn.easing.easeOut
        ] = p;
        return `${prop} ${duration}ms ${easing} ${delay}ms`;
      })
      .join(", ")
  };
};

export const theme = (mode = "dark") => {
  let theTheme = createMuiTheme({
    palette: {
      type: mode,
      primary: {
        light: "#a6d4fa",
        main: "#90caf9",
        dark: "#648dae",
        contrastText: "#fff"
      },
      background: { ...backgrounds(mode) },
      pokemonTypes: pokemonTypeColours(mode)
    },
    transitions: {
      easing: {
        bounceClick: "cubic-bezier(0.570, -5.600, 0.1, 8.650)",
        pokeEase: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        pokeSwish: "cubic-bezier(0.68, -0.6, 0.32, 1)"
      },
      duration: { medium: 500, long: 600 }
    }
  });

  theTheme.transitions.build = props => buildTransition(theTheme, props);
  return theTheme;
};
