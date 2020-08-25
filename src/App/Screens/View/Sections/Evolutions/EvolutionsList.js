import React, { useState } from "react";
import PropTypes from "prop-types";

import Color from "color";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  evolutionsListOuter: {
    height: "96px",
    display: "grid",
    placeItems: "center",
  },
  evolButton: {
    position: "absolute",
  },
  evolButtonRight: {
    transform: `translateX(${theme.spacing(6)}px)`,
  },
  evolButtonLeft: {
    transform: `translateX(${theme.spacing(-6)}px)`,
  },
  evolutionEntry: {
    position: "absolute",
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
    transform: "translateX(0) scale(0.8)",
    transition: `transform 475ms ${theme.transitions.easing.pokeEase} 75ms, border 375ms ${theme.transitions.easing.pokeEase} 75ms`,
  },
  evolutionEntryInactive: {
    border: `5px solid ${Color(theme.palette.background.tertiary)
      .mix(Color(theme.palette.text.primary), 0.25)
      .string()}`,
  },
  evolutionEntryActive: {
    border: `2.5px solid ${Color(theme.palette.background.tertiary)
      .mix(Color(theme.palette.text.primary), 0.25)
      .string()}`,
  },
}));

const evolutions = [
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
];

const evolutionsVisible = 5; // able to see 5 evolutions at once across the width of the component
const spreadPaddingFactor = 85;

const spreadPadding = (iDiff = 0) =>
  iDiff === 0 ? 0 : (Math.abs(iDiff) / iDiff) * spreadPaddingFactor;

const evolutionPosition = (current, i, spread) => {
  const iDiff = i - current;

  return iDiff * spread + spreadPadding(iDiff);
};

const Evolutions = ({ classes, listWidth }) => {
  const [currentEvolution, setEvolution] = useState(1);

  const spreadDist = listWidth / evolutionsVisible;

  return (
    <>
      {evolutions.map((evolution, i) => (
        <Avatar
          key={evolution.name}
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
              currentEvolution,
              i,
              spreadDist
            )}px) scale(${i === currentEvolution ? 1 : 0.6})`,
          }}
        />
      ))}
      {[
        {
          class: classes.evolButtonLeft,
          label: "Previous Evolution",
          component: ArrowLeftIcon,
        },
        {
          class: classes.evolButtonRight,
          label: "Next Evolution",
          component: ArrowRightIcon,
        },
      ].map((buttonInfo, i) => (
        <IconButton
          key={i}
          aria-label={buttonInfo.label}
          onClick={() => setEvolution(currentEvolution + (i * 2 - 1))}
          className={clsx(classes.evolButton, buttonInfo.class)}
        >
          <buttonInfo.component fontSize="small" />
        </IconButton>
      ))}
    </>
  );
};

export default function EvolutionsList({ pokemonStats, show, delay }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const listWidth = theme.breakpoints.values.sm * 0.175;

  return (
    <div className={classes.evolutionsListOuter}>
      <Evolutions {...{ classes, listWidth }}></Evolutions>
    </div>
  );
}

EvolutionsList.propTypes = {
  post: PropTypes.object,
};
