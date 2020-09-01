import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import SmoothIn from "Utils/transitionSmoothIn";

import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({}));

const PokemonDisplayIDNav = ({ pokemonId, ...props }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Grid item container justify="center" style={{ ...props.style }}>
      <Grid item>
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100%"
        >
          <Typography component="h2" variant="h5">
            <span
              style={{
                color: theme.palette.text.secondary,
                //fontWeight: "bold",
              }}
            >
              {" #" + pokemonId}
            </span>
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SmoothIn(PokemonDisplayIDNav);
