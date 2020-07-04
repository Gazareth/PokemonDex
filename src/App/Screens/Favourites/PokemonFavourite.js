import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import SmoothIn from "Utils/transitionSmoothIn";

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.quaternary,
    display: "flex",
    flex: 1,
  },

  cardContent: {
    background: theme.palette.background.tertiary,
    "&:last-child": {
      padding: `${theme.spacing(1.5)}px`,
      textAlign: "right",
    },
  },

  cardDetails: {
    background: theme.palette.background.tertiary,
    flex: 1,
  },

  image: {
    width: `${theme.spacing(10.75)}px`,
    height: `${theme.spacing(10.75)}px`,
  },
}));

const PokemonFavourite = ({ pokemonInfo, ...props }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card style={{ ...props.style }} className={classes.card}>
      <CardActionArea>
        <Grid container>
          <Grid item className={classes.cardDetails}>
            <CardContent className={classes.cardContent}>
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
            </CardContent>
          </Grid>
          <Box display="flex" alignItems="center">
            <img
              src={pokemonInfo.image}
              className={classes.image}
              alt={pokemonInfo.name}
            />
          </Box>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default SmoothIn(PokemonFavourite);
