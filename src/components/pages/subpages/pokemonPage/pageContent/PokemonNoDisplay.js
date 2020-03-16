import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.text.disabled
  }
}));

const PokemonNoDisplay = props => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <Typography variant="h6" className={classes.text}>
      No Pokémon Loaded
    </Typography>
  );
};

PokemonNoDisplay.propTypes = {};

export default PokemonNoDisplay;
