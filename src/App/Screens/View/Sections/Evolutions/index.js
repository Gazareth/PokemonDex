import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import OutlinedDiv from "Components/OutlinedDiv";
import Box from "@material-ui/core/Box";

import Evolutions from "./EvolutionsList";

const useStyles = makeStyles((theme) => ({
  defaultCursor: {
    cursor: "default !important",
  },
  evolutionsOuter: {
    margin: "0 auto",
    width: "80%",
    minWidth: theme.breakpoints.values.sm * 0.8,
  },
  softBg: {
    backgroundColor: theme.palette.background.tertiary,
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
      <OutlinedDiv
        label="Evolutions"
        {...{ show, delay }}
        inputRootClasses={clsx(classes.defaultCursor, classes.softBg)}
      >
        <Evolutions {...{ classes, pokemonId, pokemonEvolutions }}></Evolutions>
      </OutlinedDiv>
    </Box>
  );
}

PokemonDisplayEvolutions.propTypes = {
  post: PropTypes.object,
};
