import React from "react";
import PropTypes from "prop-types";

import Fade from "@material-ui/core/Fade";

import Typography from "@material-ui/core/Typography";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.text.disabled
  }
}));

const PokemonNoDisplay = ({ displayContent }) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <Fade
      in={displayContent}
      appear
      timeout={Math.round(process.env.REACT_APP_TABSWITCHTIME)}
    >
      <Typography variant="h6" className={classes.text}>
        No Pokémon Loaded
      </Typography>
    </Fade>
  );
};

PokemonNoDisplay.propTypes = {};

export default PokemonNoDisplay;
