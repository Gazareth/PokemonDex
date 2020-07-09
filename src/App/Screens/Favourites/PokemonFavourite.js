import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import useAnimEngine from "Hooks/AnimEngine";

import Color from "color";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import SwipeableViews from "react-swipeable-views";

import { CSSTransition } from "react-transition-group";
import SmoothIn from "Utils/transitionSmoothIn";

import PlayArrow from "@material-ui/icons/PlayArrow";
import PokeballIcon from "Icons/PokeballIcon";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";

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

  buttonGrid: {
    height: "100%",
    "& div > button": {
      margin: `auto`,
    },
    "& div > div.MuiButtonGroup-root": {
      margin: `auto 0px`,
    },
  },

  doneButton: {
    "&:hover": {
      borderWidth: "2px",
    },
  },

  upDownButtonGroup: {
    transitionTimingFunction: theme.transitions.easing.pokeBounceIn,
  },

  viewButton: {
    borderRadius: `${theme.spacing(2.5)}px`,
    marginLeft: "auto",
    "&:hover": {},
  },
  viewBackIcon: {
    transform: "scaleX(-1)",
  },

  image: {
    width: `${theme.spacing(10.75)}px`,
    height: `${theme.spacing(10.75)}px`,
  },
}));

const moveButtonsDefaultStyles = (theme) => ({
  transition: `transform 200ms ${theme.transitions.easing.pokeBounceIn} 275ms`,
  transform: "scale(0)",
});

const moveButtonsTransitionStyles = (theme) => ({
  entering: { transform: "scale(1)" },
  entered: { transform: "scale(1)" },
  exiting: {
    transform: "scale(0)",
    transitionEasingFunction: theme.transitions.easing.easeIn,
  },
  exited: {
    transform: "scale(0)",
    transitionEasingFunction: theme.transitions.easing.easeIn,
  },
});

const PokemonFavourite = ({
  pokemonInfo,
  showingOptions,
  hideOptions,
  viewPokemon,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Card style={{ ...props.style }} className={classes.card}>
      <CardActionArea disableTouchRipple={showingOptions} component="div">
        <Grid container>
          <Grid item className={classes.cardDetails}>
            <SwipeableViews
              style={{ height: "100%" }}
              containerStyle={{ height: "100%" }}
              index={showingOptions ? 0 : 1}
            >
              <Grid container className={classes.buttonGrid}>
                <Grid item container xs={2} justify="flex-start">
                  <IconButton onClick={(...args) => hideOptions()}>
                    <Close />
                  </IconButton>
                </Grid>
                <Grid item container xs={7} justify="flex-end">
                  <CSSTransition in={showingOptions} timeout={200}>
                    {(state) => (
                      <ButtonGroup
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{
                          ...moveButtonsDefaultStyles(theme),
                          ...moveButtonsTransitionStyles(theme)[state],
                        }}
                      >
                        <Button>
                          <ArrowUpward />
                        </Button>
                        <Button>
                          <ArrowDownward />
                        </Button>
                      </ButtonGroup>
                    )}
                  </CSSTransition>
                </Grid>
                <Grid item container xs={3}>
                  <Button
                    className={classes.viewButton}
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => viewPokemon()}
                  >
                    <PokeballIcon />
                  </Button>
                </Grid>
              </Grid>
              <div>
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
              </div>
            </SwipeableViews>
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
