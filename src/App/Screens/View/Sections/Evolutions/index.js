import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";

import Evolutions from "./EvolutionsList";

const useStyles = makeStyles((theme) => ({
  defaultCursor: {
    cursor: "default !important",
  },
  evolutionsOuter: {
    margin: "0 auto",
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    //minWidth: window.innerWidth * 0.8,
  },
  softBg: {
    backgroundColor: theme.palette.background.tertiary,
  },
  evolutionsHeading: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gridGap: "1rem",
    "&::before, &::after": {
      content: '""',
      display: "block",
      borderTop: "2px solid currentColor",
      borderImageSlice: "1",
    },
    "&::before": {
      borderImageSource: `linear-gradient(to right, rgba(0,0,0,0), ${theme.palette.divider}, ${theme.palette.text.disabled})`,
    },
    "&::after": {
      borderImageSource: `linear-gradient(to left, rgba(0,0,0,0), ${theme.palette.divider}, ${theme.palette.text.disabled})`,
    },
  },
  evolutionsList: {
    padding: `min(${theme.spacing(1)}px, 0.4vh) 0px`,
  },
  evolutionsFooter: {
    margin: "0",
    height: "5px",
    border: "0",
    borderTop: "2px solid",
    borderImageSlice: "1",
    borderImageSource: `linear-gradient(to right, rgba(0,0,0,0), ${theme.palette.divider}, ${theme.palette.text.disabled}, ${theme.palette.divider}, rgba(0,0,0,0))`,
  },
}));

export default function PokemonDisplayEvolutions({
  pokemonId,
  pokemonEvolutions,
  show,
  delay,
}) {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <Box className={classes.evolutionsOuter}>
      <div className={classes.evolutionsHeading}>
        <Typography>Evolutions</Typography>
      </div>
      <div className={classes.evolutionsList}>
        <Evolutions {...{ classes, pokemonId, pokemonEvolutions }}></Evolutions>
      </div>
      <hr className={classes.evolutionsFooter}></hr>
    </Box>
  );
}

PokemonDisplayEvolutions.propTypes = {
  post: PropTypes.object,
};
