import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Color from "color";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import SwipeableViews from "react-swipeable-views";

import SmoothIn from "Utils/transitionSmoothIn";

import PlayArrow from "@material-ui/icons/PlayArrow";
import PokeballIcon from "Icons/PokeballIcon";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import Done from "@material-ui/icons/Done";

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

  optionsButtonsDiv: {
    display: "flex",
    justifyContent: "right",
    height: "100%",
    "& > button": {
      margin: `auto ${theme.spacing(2.5)}px`,
    },
    "& > button:first-child": {
      marginRight: "auto",
    },
  },

  buttonGrid: {
    height: "100%",
    // "& div.MuiGrid-container > button": {
    //   margin: `auto ${theme.spacing(2)}px`,
    // },
    "& div > button": {
      margin: `auto`,
    },
    "& div > div.MuiButtonGroup-root": {
      margin: `auto 0px`,
    },
  },

  viewButton: {
    color: theme.palette.background.default,
    borderTopLeftRadius: `${theme.spacing(2.5)}px`,
    borderBottomLeftRadius: `${theme.spacing(2.5)}px`,
    //margin: "0px",
    "&:hover": {
      borderWidth: "2px",
    },
    //   color: theme.palette.text.secondary,
    //   borderColor: theme.palette.text.secondary,
    //   backgroundColor: theme.palette.secondary.main,
    // },
  },

  doneButton: {
    //color: theme.palette.success.main,
    color: theme.palette.background.default,
    backgroundColor: theme.palette.success.dark,
    //borderColor: Color(theme.palette.success.main).fade(0.5).toString(),
    marginLeft: "auto",
    "&:hover": {
      //color: theme.palette.success.main,
      //borderColor: theme.palette.success.main,
      //backgroundColor: Color(theme.palette.success.main).fade(0.92).toString(),
      backgroundColor: theme.palette.success.light,
    },
  },
  viewBackIcon: {
    transform: "scaleX(-1)",
  },

  image: {
    width: `${theme.spacing(10.75)}px`,
    height: `${theme.spacing(10.75)}px`,
  },
}));

const PokemonFavourite = ({
  pokemonInfo,
  showOptions,
  hideOptions,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card style={{ ...props.style }} className={classes.card}>
      <CardActionArea disableTouchRipple={showOptions} focused={showOptions}>
        <Grid container>
          <Grid item className={classes.cardDetails}>
            <SwipeableViews
              style={{ height: "100%" }}
              containerStyle={{ height: "100%" }}
              index={showOptions ? 0 : 1}
            >
              <Grid container className={classes.buttonGrid}>
                <Grid item container xs={3} justify="middle">
                  <Button
                    className={classes.viewButton}
                    size="large"
                    variant="contained"
                    color="secondary"
                  >
                    <PlayArrow className={classes.viewBackIcon} />
                    <PokeballIcon />
                  </Button>
                </Grid>
                <Grid item container xs={6} justify="flex-end">
                  <ButtonGroup variant="contained">
                    <Button>
                      <ArrowUpward />
                    </Button>
                    <Button>
                      <ArrowDownward />
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item container xs={3} justify="middle">
                  <Button
                    className={classes.doneButton}
                    size="large"
                    variant="contained"
                    //color="primary"
                    onClick={(...args) =>
                      console.log("CLICKED DONE!!! ARGS: ", args) ||
                      hideOptions()
                    }
                  >
                    <Done />
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
