import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import SmoothIn from "util/transitionSmoothIn";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles(theme => ({
  card: {
    background: theme.palette.background.quaternary,
    display: "flex"
  },
  cardDetails: {
    background: theme.palette.background.tertiary,
    flex: 1
  },
  favouriteIconButton: {
    margin: "auto"
  },
  favouriteIcon: {
    alignSelf: "center",
    justifySelf: "center"
  },
  colourDisabled: {
    color: theme.palette.text.disabled
  },
  types: {
    marginBottom: "8px"
  },
  physique: {
    fontVariant: "small-caps",
    marginBottom: "-0.8vh",
    display: "flex",
    color: theme.palette.text.disabled
  }
}));

const PokemonDisplayMain = props => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  const { pokemonInfo } = props;

  return (
    <Card className={classes.card} style={{ ...props.style }}>
      <Box display="flex" alignItems="center">
        <img
          src={pokemonInfo.image}
          className={classes.image}
          alt={pokemonInfo.name}
        />
      </Box>
      <div className={classes.cardDetails}>
        <CardContent>
          <Grid container>
            <Grid item xs={10} container direction="column">
              <Grid item>
                <Typography component="h2" variant="h5">
                  {pokemonInfo.name}
                  <span style={{ color: mainTheme.palette.text.secondary }}>
                    {" #" + pokemonInfo.id}
                  </span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" className={classes.types}>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    color="textSecondary"
                  >
                    Type{(pokemonInfo.types.length > 1 ? "s" : "") + ": "}
                  </Typography>
                  {pokemonInfo.types.map((type, i) => (
                    <span key={i}>
                      <span
                        style={{
                          color: mainTheme.palette.pokemonTypes[type]
                        }}
                      >
                        {type}
                      </span>
                      <>{i + 1 === pokemonInfo.types.length ? "" : ", "}</>
                    </span>
                  ))}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.physique} variant="caption">
                  <>
                    {pokemonInfo.physique.height + " decimetres "}&nbsp;&nbsp;
                    {pokemonInfo.physique.weight + " hectograms"}
                  </>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} container>
              <IconButton
                onClick={() => console.log("Icon clicked!")}
                className={classes.favouriteIconButton}
              >
                <StarIcon
                  fontSize="large"
                  className={clsx(
                    classes.favouriteIcon,
                    true && classes.colourDisabled
                  )}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

PokemonDisplayMain.propTypes = {};

export default SmoothIn(PokemonDisplayMain);
