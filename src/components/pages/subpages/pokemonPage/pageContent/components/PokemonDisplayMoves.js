import React from "react";
import PropTypes from "prop-types";
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
  red
} from "@material-ui/core/colors";

import Color from "color";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import OutlinedDiv from "components/generic/OutlinedDiv";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
    red
  ].map(colorObj => colorObj["A700"]);

const MixColours = (col1, col2, ratio) =>
  Color(col1)
    .mix(Color(col2), ratio)
    .hex();

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
        ) //todo get half way between this color and default grey if "muted" argument provided
      }
    }),
    {}
  );

const makeTextShadow = colour => "0.07em 0.07em 0 " + colour;
//"0.05em 0.04em 0 " + colour + ", 0.1em 0.08em 0em " + colour;

const resolveLevelColor = (theme, level, mix = 0.5) =>
  MixColours(
    theme.palette.background.tertiary,
    levelColours(theme.palette.type === "light")[
      Math.floor(level / (100 / levelColours().length))
    ],
    mix
  );

const useStyles = makeStyles(theme => ({
  noCursor: {
    cursor: "default !important"
  },
  softBg: {
    backgroundColor: theme.palette.background.tertiary
  },
  fullHeight: {
    height: "100%"
  },
  overflowAuto: {
    flex: "auto",
    overflow: "auto"
  },
  listMargin: {
    margin: "2.8em",
    marginTop: "2.2em"
  },
  levelNumber: {
    fontWeight: "800",
    color: theme.palette.text.primary
  },
  levelText: {
    fontSize: "0.65rem",
    fontWeight: "700",
    fontVariant: "small-caps",
    textShadow: "none",
    //"-1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444, 1px 1px 0 #444",
    color: theme.palette.text.secondary
  },
  backgroundTestColour: {
    backgroundColor: theme.palette.background.default
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
  ...typeColoursClasses(
    theme,
    theme.palette.background.default,
    "typeLevelBackgroundColor",
    "backgroundColor",
    0.95
  )
}));

const PokemonMoves = ({ classes, pokemonMoves, theme }) => (
  <List className={classes.listMargin}>
    {pokemonMoves.map((move, i) => (
      <div key={i}>
        <ListItem
          style={{
            //borderRadiusLeft: "22px",
            border: "1px solid " + theme.palette.background.senary,
            ...(i === 0
              ? {
                  //borderTop: "",
                  borderTopLeftRadius: "0.3em",
                  borderTopRightRadius: "0.3em"
                }
              : i === pokemonMoves.length - 1
              ? {
                  borderTop: "",
                  borderBottomLeftRadius: "0.3em",
                  borderBottomRightRadius: "0.3em"
                }
              : { borderTop: "" }) //"0px solid #000"
          }}
          classes={{
            root: classes["typeBackgroundColor-" + move.type]
          }}
          button
        >
          <ListItemAvatar>
            <Avatar
              style={{
                border: "1px solid" + resolveLevelColor(theme, move.level)
              }}
              classes={{
                root: classes.backgroundTestColour //classes["typeLevelBackgroundColor-" + move.type]
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
                  color: resolveLevelColor(theme, move.level, 0.5)
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

export default function PokemonDisplayMoves({
  pokemonMoves,
  show,
  delay,
  doHeight,
}) {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <OutlinedDiv
      label={"Moves (" + pokemonMoves.length + ")"}
      {...{ show, delay, doHeight }}
      classes={{ root: classes.fullHeight }}
      inputClassName={clsx(classes.fullHeight, classes.overflowAuto)}
      inputRootClasses={clsx(
        classes.softBg,
        classes.noCursor,
        classes.fullHeight
      )}
    >
      <PokemonMoves {...{ classes, pokemonMoves, theme: mainTheme }} />
    </OutlinedDiv>
  );
}

PokemonDisplayMoves.propTypes = {};
