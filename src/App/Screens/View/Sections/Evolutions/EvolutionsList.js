import React, { useState } from "react";
import PropTypes from "prop-types";

import Color from "color";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Tooltip } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import Avatar from "@material-ui/core/Avatar";

const LIST_WIDTH_FACTOR = 0.175;

const useStyles = makeStyles((theme) => ({
  evolutionsListOuter: {
    height: "96px",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  evolButton: {
    position: "absolute",
    zIndex: 100,
    padding: theme.spacing(0.5),
    "& svg ": {
      fontSize: "1rem",
    },
  },
  evolButtonLeft: {
    transform: `translateX(${theme.spacing(-6)}px) rotate(0.5turn)`,
  },
  evolButtonRight: {
    transform: `translateX(${theme.spacing(6)}px)`,
  },
  evolutionEntry: {
    cursor: "pointer",
    position: "absolute",
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
    transform: "translateX(0) scale(0.8)",
    transition: `transform 475ms ${theme.transitions.easing.pokeEase}, border 375ms ${theme.transitions.easing.pokeEase}`,
  },
  evolutionEntryInactive: {
    border: `5px solid ${Color(theme.palette.background.tertiary)
      .mix(Color(theme.palette.text.primary), 0.25)
      .string()}`,
    "&:hover": {
      filter: "brightness(1.35)",
    },
  },
  evolutionEntryActive: {
    border: `2.85px solid ${Color(theme.palette.background.tertiary)
      .mix(Color(theme.palette.text.primary), 0.25)
      .string()}`,
    "&:hover": {
      filter: "brightness(1.15)",
    },
  },
}));

const placeholderEvolutions = [
  {
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png",
    name: "Gloom",
  },
  {
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
    name: "Magikarp",
  },
  {
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
    name: "Gyarados",
  },
  {
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    name: "Ditto",
  },
  {
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png",
    name: "Diglett",
  },
  {
    img:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png",
    name: "Poliwrath",
  },
];

const interEvolutionPaddingFactor = 5; // % of remaining space to use as padding between each evolution
const PADDING_SELECTED = 75; // 75 each side

const newEvolution = (currentEvolution, direction) =>
  currentEvolution + (direction * 2 - 1);

const isAtEnd = (evolutionsLength, newEvolution) => {
  return [-1, evolutionsLength].includes(newEvolution);
};

const selectedPadding = (iDiff = 0) =>
  iDiff === 0 ? 0 : (Math.abs(iDiff) / iDiff) * PADDING_SELECTED;

const evolutionPosition = (iDiff, spread) =>
  selectedPadding(iDiff) + iDiff * spread;

/*** EVOLUTIONS ****/
const Evolutions = ({ viewingId, evolutions, classes, listWidth }) => {
  const [currentEvolution, setEvolution] = useState(
    evolutions.findIndex((evol) => evol.id === viewingId)
  );

  const spreadDist =
    (listWidth * 0.9 - 75 * 2) * (interEvolutionPaddingFactor / 100);

  return (
    <>
      {evolutions.map((evolution, i) => {
        const iDiff = i - currentEvolution;
        const evolutionsOnSide = evolutions.filter((evo, j) =>
          iDiff > 0 ? j > currentEvolution : j < currentEvolution
        ).length; // how many evolutions on this side of the selected
        const evolutionsAhead = evolutions.filter((evo, j) =>
          iDiff > 0 ? j > i : j < i
        ).length;

        const evolutionExtend =
          (evolutionsOnSide - evolutionsAhead) / evolutionsOnSide; // how far along till the end is this evolution

        const evolScale =
          0.75 - (evolutionsOnSide === 1 ? 0 : 0.4 * evolutionExtend);

        return (
          <Avatar
            key={evolution.id}
            onClick={() => setEvolution(i)}
            alt={evolution.name}
            src={evolution.img}
            className={clsx(
              classes.evolutionEntry,
              currentEvolution === i
                ? classes.evolutionEntryActive
                : classes.evolutionEntryInactive
            )}
            style={{
              transform: `translateX(${evolutionPosition(
                iDiff,
                spreadDist
              )}px) scale(${i === currentEvolution ? 1 : evolScale})`,
              zIndex: i === currentEvolution ? 1 : Math.round(evolScale * 100),
            }}
          />
        );
      })}
      {[
        {
          class: classes.evolButtonLeft,
          label: "Previous Evolution",
          component: PlayArrowIcon,
        },
        {
          class: classes.evolButtonRight,
          label: "Next Evolution",
          component: PlayArrowIcon,
        },
      ].map((buttonInfo, i) => {
        const nextEvolution = newEvolution(currentEvolution, i);
        const canScroll = !isAtEnd(evolutions.length, nextEvolution);
        return (
          <IconButton
            key={i}
            aria-label={buttonInfo.label}
            disabled={!canScroll}
            onClick={() => {
              if (canScroll) setEvolution(nextEvolution);
            }}
            className={clsx(classes.evolButton, buttonInfo.class)}
          >
            <buttonInfo.component />
          </IconButton>
        );
      })}
    </>
  );
};

export default function EvolutionsList({ pokemonId, pokemonEvolutions }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const listWidth = Math.min(theme.breakpoints.values.sm, window.innerWidth);

  return (
    <div className={classes.evolutionsListOuter}>
      <Evolutions
        {...{
          viewingId: pokemonId,
          evolutions: pokemonEvolutions,
          classes,
          listWidth,
        }}
      ></Evolutions>
    </div>
  );
}

EvolutionsList.propTypes = {
  post: PropTypes.object,
};
