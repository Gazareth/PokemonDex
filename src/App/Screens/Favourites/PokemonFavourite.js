import React, { useMemo } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Color from "color";

import useAnimEngine from "Hooks/AnimEngine";

import clsx from "clsx";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import Avatar from "@material-ui/core/Avatar";

import SwipeableViews from "react-swipeable-views";

import SmoothIn from "Utils/transitionSmoothIn";

import PokeballIcon from "Icons/PokeballIcon";

import ReorderIcon from "@material-ui/icons/Reorder";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";

import ContactSupportRoundedIcon from "@material-ui/icons/ContactSupportRounded";

const useStyles = makeStyles((theme) => ({
  card: {
    // background: "transparent",
    // transition: "background 245ms ease-out",
  },

  cardControllerInner: {
    transitionProperty: "margin, max-width, filter, transform",
    transitionDuration: "345ms",
    transitionDelay: "0ms",
    transitionTimingFunction: theme.transitions.easing.pokeEase,
    margin: "auto",
    maxWidth: "100%",
  },
  innerControllerUnselected: {
    filter: "grayscale(90%) opacity(65%) contrast(90%) brightness(85%)",
    transform: "scale(0.95)",
  },
  innerControllerMutable: {
    maxWidth: "90%",
  },

  mutableCard: {
    border: "none",
    background: "transparent",
  },

  cardContent: {
    transition: "padding 245ms ease-out",
    height: "100%",
    padding: `${theme.spacing(1.5)}px`,
  },

  cardContentMutable: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
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

  fader: {
    transitionProperty: "opacity",
    transitionDuration: "445ms",
    transitionTimingFunction: "ease-out",
  },

  faderOut: {
    opacity: "0",
    transitionDuration: "145ms",
  },

  cardDetails: {
    background: theme.palette.background.tertiary,
    flex: 1,
  },

  pokemonSprite: {
    height: theme.spacing(12),
    width: theme.spacing(12),
  },

  noSprite: {
    padding: theme.spacing(3),
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

const MoveButtons = SmoothIn(
  ({ classes, viewPokemon, moveSwapFavourite, ...props }) => (
    <ButtonGroup
      style={props.style}
      variant="contained"
      color="primary"
      size="small"
    >
      <Button>
        <ArrowUpward onClick={() => moveSwapFavourite(true)} />
      </Button>
      <Button>
        <ArrowDownward onClick={() => moveSwapFavourite(false)} />
      </Button>
    </ButtonGroup>
  )
);

const CloseButton = SmoothIn(({ classes, hideOptions, ...props }) => (
  <IconButton style={props.style} onClick={() => hideOptions()}>
    <NavigateBeforeOutlinedIcon />
  </IconButton>
));

const PokemonFavourite = ({
  forwardRef,
  inDefaultMode,
  inSwitchMode,
  dragHandleProps,
  pokemonInfo,
  favouriteIndex,
  isLast,
  displayContent,
  isSelected,
  isNotSelected,
  hideOptions,
  viewPokemon,
  moveSwapFavourite,
  removeAsFavourite,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const isLoaded = useMemo(() => typeof pokemonInfo.image !== undefined, [
    pokemonInfo,
  ]);

  const anim = useAnimEngine(
    3,
    displayContent && isSelected,
    { delay: 275, duration: 225 },
    100,
    0.2
  );

  return (
    <div
      ref={forwardRef}
      style={{
        ...props.style,
      }}
    >
      <div
        className={clsx(classes.cardControllerInner, {
          [classes.innerControllerUnselected]: isNotSelected,
          [classes.innerControllerMutable]: !inDefaultMode,
        })}
      >
        <Card
          className={clsx(classes.card, {
            [classes.mutableCard]: !inDefaultMode,
          })}
          elevation={0}
          //elevation={isSelected ? 6 : inSwitchMode ? 0 : 1}
        >
          <CardActionArea
            disableTouchRipple={isSelected}
            disableRipple={!inDefaultMode}
            className={clsx(classes.cardActionArea, {
              [classes.actionAreaDisabled]: !inDefaultMode,
            })}
            classes={{
              ...(inDefaultMode
                ? {}
                : { focusHighlight: classes.focusHighlight }),
              root: classes.cardActionArea,
            }}
            component="div"
          >
            <Grid container>
              <Grid
                item
                style={{
                  ...(inDefaultMode
                    ? { maxWidth: theme.spacing(6) }
                    : { maxWidth: "0" }),
                  padding: "0.509px",
                  width: theme.spacing(6),
                  transition: `max-width ${theme.spacing(12) * 2.5}ms ${
                    theme.transitions.easing.pokeEase
                  }`,
                  overflow: "hidden",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    transition: `border-radius ${theme.spacing(12) * 2.5}ms ${
                      theme.transitions.easing.pokeEase
                    }`,
                    border: "1px transparent",
                    borderRadius: "0.25rem",
                    borderTopRightRadius: isSelected ? "1rem" : "0.55rem",
                    borderBottomLeftRadius: isSelected ? "1.2rem" : "0.6rem",
                    background: Color(theme.palette.background.tertiary).mix(
                      Color(theme.palette.background.quaternary),
                      0.6
                    ),
                    detail3: Color(theme.palette.primary.main),
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h5"
                    className={clsx(classes.fader, {
                      [classes.faderOut]: !inDefaultMode,
                    })}
                    color={isSelected ? "textPrimary" : "textSecondary"}
                  >
                    {favouriteIndex + 1}
                  </Typography>
                </Box>
              </Grid>
              <Grid item container style={{ flex: 1 }} {...dragHandleProps}>
                <Grid
                  item
                  className={classes.cardDetails}
                  style={{ minWidth: "33%" }}
                >
                  <SwipeableViews
                    style={{ ...swipeableStyle }}
                    containerStyle={{ height: "100%" }}
                    slideStyle={{ ...swipeableStyle }}
                    index={isLoaded ? (isSelected ? 0 : 1) : 2}
                    disabled
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
                          {...{ ...anim(), viewPokemon, moveSwapFavourite }}
                          classes={classes}
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
                    <Grid
                      item
                      container
                      className={clsx(classes.cardContent, {
                        [classes.cardContentMutable]: !inDefaultMode,
                      })}
                      justify="space-around"
                    >
                      <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        className={clsx(classes.fader, {
                          [classes.faderOut]: inDefaultMode,
                        })}
                        style={{
                          transitionDuration: inDefaultMode ? "195ms" : "750ms",
                          ...(inDefaultMode
                            ? {}
                            : { transitionDelay: "345ms" }),
                        }}
                        xs={1}
                      >
                        {inSwitchMode ? (
                          <ReorderIcon color="disabled" />
                        ) : (
                          !inDefaultMode && (
                            <IconButton onClick={removeAsFavourite}>
                              <DeleteTwoToneIcon />
                            </IconButton>
                          )
                        )}
                      </Grid>
                      <Grid
                        item
                        container
                        //xs={10}
                        direction="column"
                        justify="center"
                        style={{ flex: "1" }}
                      >
                        <Grid item container justify="flex-end">
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
                        <Grid item container justify="flex-end">
                          <Typography
                            variant="subtitle2"
                            className={classes.types}
                          >
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
                                  {i + 1 === pokemonInfo.types.length
                                    ? ""
                                    : ", "}
                                </>
                              </span>
                            ))}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </SwipeableViews>
                </Grid>
                <Grid item>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="left"
                    style={{
                      background: theme.palette.background.quaternary,
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Avatar
                      src={pokemonInfo.image}
                      variant="square"
                      className={classes.pokemonSprite}
                      alt={pokemonInfo.name}
                    >
                      <ContactSupportRoundedIcon
                        className={clsx(
                          classes.pokemonSprite,
                          classes.noSprite
                        )}
                      />
                    </Avatar>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

const areEqual = (prevProps, nextProps) =>
  prevProps.favouriteIndex === nextProps.favouriteIndex &&
  prevProps.inDefaultMode === nextProps.inDefaultMode &&
  prevProps.pokemonInfo === nextProps.pokemonInfo &&
  prevProps.favouriteIndex === nextProps.favouriteIndex &&
  prevProps.displayContent === nextProps.displayContent &&
  prevProps.isSelected === nextProps.isSelected &&
  prevProps.isNotSelected === nextProps.isNotSelected;

export default React.memo(SmoothIn(PokemonFavourite), areEqual);
