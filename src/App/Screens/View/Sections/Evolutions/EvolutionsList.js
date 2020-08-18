import React, { useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  evolutionsListOuter: {
    height: "96px",
    display: "grid",
    placeItems: "center",
  },
  evolutionEntry: {
    position: "absolute",
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
    transform: "translateX(0)",
    transition: `transform 475ms cubic-bezier(0.34, 1.56, 0.64, 1) 75ms`,
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

const evolutionPosition = (current, i, spread) => (i - current) * spread;

const Evolutions = ({ classes, listWidth }) => {
  const [currentEvolution, setEvolution] = useState(1);

  const spreadDist = listWidth / evolutionsVisible;
  //const radius = listWidth * 0.5;

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
              )}px)`,
          }}
        />
      ))}
    </>
  );
};

export default function EvolutionsList({ pokemonStats, show, delay }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const listWidth = theme.breakpoints.values.sm * 0.65;

  return (
    <div className={classes.evolutionsListOuter}>
      <Evolutions {...{ classes, listWidth }}></Evolutions>
    </div>
  );
}

EvolutionsList.propTypes = {
  post: PropTypes.object,
};
