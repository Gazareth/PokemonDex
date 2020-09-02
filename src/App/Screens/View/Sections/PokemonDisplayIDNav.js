import React from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import SmoothIn from "Utils/transitionSmoothIn";

import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  paginationList: {
    margin: 0,
    display: "flex",
    padding: 0,
    flexWrap: "wrap",
    listStyle: "none",
    alignItems: 2,
  },
}));

const getNewUrl = (pokemonId) => `/view/?id=${pokemonId}`;

const PokemonDisplayIDNav = ({ pokemonId, ...props }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const history = useHistory();

  const toNewView = (id) => () => history.push(getNewUrl(id));

  return (
    <Grid
      item
      container
      spacing={1}
      justify="center"
      style={{ ...props.style }}
    >
      <Grid item>
        <IconButton onClick={toNewView(pokemonId - 1)}>
          <ArrowForwardIosIcon
            style={{ transform: "rotate(0.5turn)" }}
            size="small"
          />
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
        <IconButton onClick={toNewView(pokemonId + 1)}>
          <ArrowForwardIosIcon size="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SmoothIn(PokemonDisplayIDNav);
