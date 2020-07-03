import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import SmoothIn from "Utils/transitionSmoothIn";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.quaternary,
    display: "flex",
  },
  cardDetails: {
    background: theme.palette.background.tertiary,
    flex: 1,
  },
  cardContent: {
    "&:last-child": {
      padding: `${theme.spacing(1.5)}px`,
      textAlign: "right",
    },
  },
  favouriteIconButton: {
    margin: "auto",
  },
  favouriteIcon: {
    alignSelf: "center",
    justifySelf: "center",
    color: theme.palette.pokemonTypes["Electric"],
    filter: "brightness(0.85) saturate(2)",
  },
  colourDisabled: {
    color: theme.palette.text.disabled,
  },
  image: {
    width: `${theme.spacing(10.75)}px`,
    height: `${theme.spacing(10.75)}px`,
  },
}));

const PokemonDisplayMain = ({
  variant,
  pokemonInfo,
  isFavourite,
  addToFavourites,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Card className={classes.card} style={{ ...props.style }}>
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item container>
              <Grid item xs={12}>
                <Grid item>
                  <Typography component="h2" variant="h5">
                    <span
                      style={{
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {"#" + pokemonInfo.id + " "}
                    </span>
                    {pokemonInfo.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.types}>
                    {pokemonInfo.types.map((type, i) => (
                      <span key={i}>
                        <span
                          style={{
                            color: theme.palette.pokemonTypes[type],
                          }}
                        >
                          {type}
                        </span>
                        <>{i + 1 === pokemonInfo.types.length ? "" : ", "}</>
                      </span>
                    ))}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </div>
      <Box display="flex" alignItems="center">
        <img
          src={pokemonInfo.image}
          className={classes.image}
          alt={pokemonInfo.name}
        />
      </Box>
    </Card>
  );
};

PokemonDisplayMain.propTypes = {
  variant: PropTypes.oneOf(["main", "favourites"]),
};

PokemonDisplayMain.defaultProps = {
  variant: "main",
};

export default SmoothIn(PokemonDisplayMain);
