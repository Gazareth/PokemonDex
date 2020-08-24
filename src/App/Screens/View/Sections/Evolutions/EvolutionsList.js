import React, { useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

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
    transition: `transform 475ms ease-out 75ms`,
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
const spreadPaddingFactor = 25;

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
          className={classes.evolutionEntry}
          style={{
            transform:
              console.log(
                "Calculating evolution position for ",
                i,
                "Got: ",
                evolutionPosition(currentEvolution, i, spreadDist)
              ) ||
              `translateX(${evolutionPosition(
                currentEvolution,
                i,
                spreadDist
              )}px) scale(${i === currentEvolution ? 1 : 0.8})`,
          }}
        />
      ))}
      {[classes.evolButtonLeft, classes.evolButtonRight].map((buttonClass) => (
        <IconButton className={clsx(classes.evolButton, buttonClass)}>
          <ArrowRightIcon />
        </IconButton>
      ))}
    </>
  );
};

export default function EvolutionsList({ pokemonStats, show, delay }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const listWidth = theme.breakpoints.values.sm * 0.55;

  return (
    <div className={classes.evolutionsListOuter}>
      <Evolutions {...{ classes, listWidth }}></Evolutions>
    </div>
  );
}

EvolutionsList.propTypes = {
  post: PropTypes.object,
};
