import React from "react";
import PropTypes from "prop-types";

import Color from "color";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import {
  green,
  lightGreen,
  lime,
  yellow,
  orange,
  indigo,
  deepPurple,
  purple,
  pink,
  red,
} from "@material-ui/core/colors";

const MixColours = (col1, col2, ratio) =>
  Color(col1).mix(Color(col2), ratio).hex();

const levelColours = (darkLight = false) =>
  [
    green,
    lightGreen,
    lime,
    yellow,
    orange,
    indigo,
    deepPurple,
    purple,
    pink,
    red,
  ].map((colorObj) => colorObj["A700"]);

const typeColoursClasses = (
  theme,
  colorBlend,
  classPrefix,
  key,
  muted = false
) =>
  Object.keys(theme.palette.pokemonTypes).reduce(
    (classes, typesColorKey) => ({
      ...classes,
      [classPrefix + "-" + typesColorKey]: {
        [key]: MixColours(
          theme.palette.pokemonTypes[typesColorKey],
          colorBlend,
          muted || 0
        ), //todo get half way between this color and default grey if "muted" argument provided
      },
    }),
    {}
  );

const makeTextShadow = (colour) => "0.07em 0.07em 0 " + colour;

const resolveLevelColor = (theme, level, mix = 0.5) =>
  MixColours(
    theme.palette.background.tertiary,
    levelColours(theme.palette.type === "light")[
      Math.floor(level / (100 / levelColours().length))
    ],
    mix
  );

const useStyles = makeStyles((theme) => ({
  listMargin: {
    margin: "5%",
  },
  levelNumber: {
    fontWeight: "800",
    color: theme.palette.text.primary,
  },
  levelText: {
    fontSize: "0.65rem",
    fontWeight: "700",
    fontVariant: "small-caps",
    textShadow: "none",
    //"-1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444, 1px 1px 0 #444",
    color: theme.palette.text.secondary,
  },
  backgroundTestColour: {
    backgroundColor: theme.palette.background.default,
  },
  ...typeColoursClasses(
    theme,
    theme.palette.text.secondary,
    "typeTextColor",
    "color"
  ),
  ...typeColoursClasses(
    theme,
    theme.palette.background.default,
    "typeBackgroundColor",
    "backgroundColor",
    0.925
  ),
  // ...typeColoursClasses(
  //   theme,
  //   theme.palette.background.default,
  //   "typeLevelBackgroundColor",
  //   "backgroundColor",
  //   0.95
  // ),
}));

const PokemonMovesList = ({ pokemonMoves }) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <List className={classes.listMargin}>
      {pokemonMoves.map((move, i) => (
        <div key={i}>
          <ListItem
            style={{
              //borderRadiusLeft: "22px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: theme.palette.background.senary,
              ...(i === 0
                ? {
                    borderTopLeftRadius: "0.3em",
                    borderTopRightRadius: "0.3em",
                  }
                : i === pokemonMoves.length - 1
                ? {
                    borderWidth: "0 1px 1px",
                    borderBottomLeftRadius: "0.3em",
                    borderBottomRightRadius: "0.3em",
                  }
                : { borderWidth: "0 1px 1px" }), //"0px solid #000"
            }}
            classes={{
              root: classes["typeBackgroundColor-" + move.type],
            }}
            button
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  border: "1px solid" + resolveLevelColor(theme, move.level),
                }}
                classes={{
                  root: classes.backgroundTestColour, //classes["typeLevelBackgroundColor-" + move.type]
                }}
              >
                <Typography
                  className={classes.levelNumber}
                  style={{
                    textShadow: makeTextShadow(
                      "rgba(" +
                        Color(
                          MixColours(
                            theme.palette.text.primary,
                            resolveLevelColor(theme, move.level, 0.5),
                            0.0
                          )
                        )
                          .rgb()
                          .array()
                          .join(",") +
                        "," +
                        0.75 +
                        ")"
                    ),
                    color: resolveLevelColor(theme, move.level, 0.5),
                  }}
                >
                  <Typography component="span" className={classes.levelText}>
                    {"Lv."}
                  </Typography>
                  {move.level}
                </Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              classes={{ secondary: classes["typeTextColor-" + move.type] }}
              primary={move.name}
              secondary={move.type}
            />
          </ListItem>
        </div>
      ))}
    </List>
  );
};

export default PokemonMovesList;
