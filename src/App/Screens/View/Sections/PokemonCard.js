import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import Color from "color";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import SmoothIn from "Utils/transitionSmoothIn";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

import IconButton from "@material-ui/core/IconButton";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import GradeIcon from "@material-ui/icons/Grade";

import usePlaySound from "Hooks/usePlaySound";

const useStyles = makeStyles((theme) => ({
  card: {
    ...theme.panelStyles,
    ...theme.panelBorder,
    backgroundColor: theme.palette.background.quaternary,
    display: "flex",
    boxShadow: "none",
  },
  cardDetails: {
    background: theme.palette.background.tertiary,
    flex: 1,
  },
  favouriteIconButton: {
    margin: "auto",
  },
  favouriteIcon: {
    alignSelf: "center",
    justifySelf: "center",
    color: theme.palette.warning.light,
    filter: "brightness(0.85) saturate(2)",
  },
  colourDisabled: {
    color: theme.palette.text.disabled,
  },
  types: {
    marginBottom: "8px",
  },
  physique: {
    fontVariant: "small-caps",
    marginBottom: "-0.8vh",
    display: "flex",
    color: theme.palette.text.disabled,
  },
  pkmnImg: {
    position: "absolute",
    filter: "opacity(0)",
  },
  pkmnImgPower: {
    animation: `$specialPower 375ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes specialPower": {
    "0%": {
      filter: "opacity(1)",
      transform: "scale(1)",
    },
    "100%": {
      filter: "opacity(0)",
      transform: "scale(1.65)",
    },
  },
}));

const FavouritesIcon = ({ isFavourite, ...otherProps }) => {
  const Icon = isFavourite ? GradeIcon : StarBorderOutlinedIcon;

  return <Icon {...{ ...otherProps }} />;
};

const PokemonDisplayMain = ({
  pokemonInfo,
  isFavourite,
  addToFavourites,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    playFaveAdded,
    playFaveRemoved,
    playGhostSound,
    playPikachuSound,
  } = usePlaySound();
  const [playingSound, setPlayingSound] = useState(false);
  const secretImg = useRef(null);

  const isGhost = pokemonInfo.types.includes("Ghost");
  const isPika = pokemonInfo.name === "Pikachu";
  const isSpecial = isGhost || isPika;

  const handleImgClick = (e) => {
    if (playingSound) {
      return;
    }
    if (isGhost) {
      playGhostSound();
    } else if (isPika) {
      playPikachuSound();
    }
    setPlayingSound(true);
    secretImg.current.classList.add(classes.pkmnImgPower);
    setTimeout(() => {
      setPlayingSound(false);
      secretImg.current.classList.remove(classes.pkmnImgPower);
    }, 1000);
  };

  const handleFavClick = () => {
    if (isFavourite) {
      playFaveRemoved();
    } else {
      playFaveAdded();
    }
    addToFavourites();
  };

  return (
    <Card
      className={classes.card}
      style={{
        ...props.style,
        ...(isFavourite
          ? {
              backgroundColor: Color(theme.palette.background.quaternary).mix(
                Color(theme.palette.warning.light),
                0.1
              ),
              borderColor: Color(theme.palette.background.tertiary)
                .mix(Color(theme.palette.background.quaternary), 0.2)
                .mix(Color(theme.palette.warning.main), 0.3),
            }
          : {}),
      }}
    >
      <Box display="flex" alignItems="center">
        <img
          src={pokemonInfo.image}
          className={classes.image}
          alt={pokemonInfo.name}
        />
        {isSpecial && (
          <img
            ref={secretImg}
            src={pokemonInfo.image}
            className={clsx(classes.image, classes.pkmnImg)}
            alt={pokemonInfo.name}
            onClick={handleImgClick}
          />
        )}
      </Box>
      <div
        className={classes.cardDetails}
        style={{
          ...(isFavourite
            ? {
                backgroundColor: Color(theme.palette.background.tertiary).mix(
                  Color(theme.palette.warning.light),
                  0.1
                ),
              }
            : {}),
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={10} container direction="column">
              <Grid item>
                <Typography component="h2" variant="h5">
                  {pokemonInfo.name}
                  <span
                    style={{
                      color: theme.palette.text.secondary,
                      fontWeight: "bold",
                    }}
                  >
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
                onClick={handleFavClick}
                className={classes.favouriteIconButton}
              >
                <FavouritesIcon
                  fontSize="large"
                  isFavourite={isFavourite}
                  className={clsx(
                    classes.favouriteIcon,
                    !isFavourite && classes.colourDisabled
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

PokemonDisplayMain.propTypes = {
  pokemonInfo: PropTypes.object,
  isFavourite: PropTypes.bool,
  addToFavourites: PropTypes.func,
};

export default SmoothIn(PokemonDisplayMain);
