import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import useAnimEngine from "Hooks/AnimEngine";

import clsx from "clsx";

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

import SmoothIn from "Utils/transitionSmoothIn";

import PokeballIcon from "Icons/PokeballIcon";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.quaternary,
    transition: "background 245ms ease-out",
  },
  cardFixed: {},

  cardControllerInner: {
    transitionProperty: "margin, filter, transform",
    transitionDuration: "475ms",
  },
  innerControllerUnselected: {
    filter: "grayscale(90%) opacity(65%) contrast(90%) brightness(85%)",
    transform: "scale(0.95)",
  },
  innerControllerDraggable: {
    margin: "0 10%",
  },

  draggableCard: {
    border: "none",
    background: "transparent",
    //boxShadow: "none",
  },

  cardContent: {
    background: theme.palette.background.tertiary,
    "&:last-child": {
      padding: `${theme.spacing(1.5)}px`,
      textAlign: "right",
    },
  },

  cardActionArea: {
    transition: "opacity 245ms ease-out",
  },

  actionAreaDisabled: {
    "&:hover $focusHighlight": {
      opacity: "0",
    },
  },

  focusHighlight: {
    opacity: "0",
  },

  rankingNumber: {
    transition: "color 245ms ease-out",
  },

  rankingNumberOff: {
    color: "transparent",
  },

  cardDetails: {
    background: theme.palette.background.tertiary,
    flex: 1,
  },

  pokemonSprite: {
    transition: "filter 245ms ease-out",
  },

  pokemonSpriteBusy: {
    filter: "grayscale(30%) opacity(85%) contrast(90%) brightness(85%)",
  },

  buttonGrid: {
    height: "100%",
    overflow: "hidden",
    // "& > div": {
    //   padding: `0 ${theme.spacing(2)}px`,
    // },
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

const swipeableStyle = { height: "100%", overflow: "hidden" };

const ViewButton = SmoothIn(({ classes, viewPokemon, ...props }) => (
  <Button
    className={classes.viewButton}
    size="large"
    variant="contained"
    color="secondary"
    style={props.style}
    onClick={() => viewPokemon()}
  >
    <PokeballIcon />
  </Button>
));

const MoveButtons = SmoothIn(({ classes, viewPokemon, ...props }) => (
  <ButtonGroup
    style={props.style}
    variant="contained"
    color="primary"
    size="small"
  >
    <Button>
      <ArrowUpward />
    </Button>
    <Button>
      <ArrowDownward />
    </Button>
  </ButtonGroup>
));

const CloseButton = SmoothIn(({ classes, hideOptions, ...props }) => (
  <IconButton style={props.style} onClick={() => hideOptions()}>
    <NavigateBeforeOutlinedIcon />
  </IconButton>
));

const PokemonFavourite = ({
  inSwitchMode,
  dragHandleProps,
  pokemonInfo,
  favouriteIndex,
  displayContent,
  isSelected,
  isNotSelected,
  hideOptions,
  viewPokemon,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const anim = useAnimEngine(
    3,
    displayContent && isSelected,
    225,
    75,
    false,
    1
  );

  return (
    <div
      style={{
        ...props.style,
      }}
    >
      <div
        className={clsx(classes.cardControllerInner, {
          [classes.innerControllerUnselected]: isNotSelected,
          [classes.innerControllerDraggable]: inSwitchMode,
        })}
      >
        <Card
          className={clsx(classes.card, {
            [classes.draggableCard]: inSwitchMode,
          })}
          elevation={isSelected ? 6 : inSwitchMode ? 0 : 1}
        >
          <CardActionArea
            disableTouchRipple={isSelected}
            disableRipple={inSwitchMode}
            className={clsx(classes.cardActionArea, {
              [classes.actionAreaDisabled]: inSwitchMode,
            })}
            classes={{
              ...(inSwitchMode
                ? { focusHighlight: classes.focusHighlight }
                : {}),
              root: classes.cardActionArea,
            }}
            component="div"
          >
            <Grid container>
              <Grid
                item
                xs={1}
                style={{
                  ...(inSwitchMode ? { maxWidth: "0" } : {}),
                  transition: "max-width 245ms ease-out",
                }}
              >
                <Box
                  display="flex"
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    component="h3"
                    variant="h5"
                    className={clsx(classes.rankingNumber, {
                      [classes.rankingNumberOff]: inSwitchMode,
                    })}
                    color={isSelected ? "textPrimary" : "textSecondary"}
                  >
                    {favouriteIndex + 1}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                {...(inSwitchMode ? { ...dragHandleProps } : {})}
                className={classes.cardDetails}
              >
                <SwipeableViews
                  style={{ ...swipeableStyle }}
                  containerStyle={{ height: "100%" }}
                  slideStyle={{ ...swipeableStyle }}
                  index={isSelected ? 0 : 1}
                >
                  <Grid container className={classes.buttonGrid}>
                    <Grid item container xs={2} justify="flex-start">
                      <CloseButton
                        {...anim()}
                        classes={classes}
                        hideOptions={hideOptions}
                        transitionType="Bounce"
                        theme={theme}
                      />
                    </Grid>
                    <Grid item container xs={6} sm={7} justify="flex-end">
                      <MoveButtons
                        {...anim()}
                        classes={classes}
                        viewPokemon={viewPokemon}
                        transitionType="Bounce"
                        theme={theme}
                      />
                    </Grid>
                    <Grid item container xs={4} sm={3}>
                      <ViewButton
                        {...anim()}
                        classes={classes}
                        viewPokemon={viewPokemon}
                        transitionType="Bounce"
                        theme={theme}
                      />
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
                            <>
                              {i + 1 === pokemonInfo.types.length ? "" : ", "}
                            </>
                          </span>
                        ))}
                      </Typography>
                    </CardContent>
                  </div>
                </SwipeableViews>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  ...(inSwitchMode ? { maxWidth: "0" } : {}),
                  transition: "max-width 245ms ease-out",
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <img
                    src={pokemonInfo.image}
                    className={clsx(classes.pokemonSprite, {
                      [classes.pokemonSpriteBusy]: inSwitchMode,
                    })}
                    alt={pokemonInfo.name}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default SmoothIn(PokemonFavourite);
