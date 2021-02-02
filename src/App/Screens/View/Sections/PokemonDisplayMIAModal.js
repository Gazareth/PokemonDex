import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import get from "lodash/get";
import startCase from "lodash/startCase";

import OutlinedDiv from "Components/OutlinedDiv";
import PokemonMovesList from "./PokemonMovesList";
import PokemonItemsList from "./PokemonItemsList";

const useStyles = makeStyles((theme) => ({
  noCursor: {
    cursor: "default !important",
  },
  softBg: {
    backgroundColor: theme.palette.background.tertiary,
  },
  noBorder: {
    "&>label.MuiFormLabel-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.secondary,
      },
    },
  },
  fullHeight: {
    height: "100%",
  },
  overflowAuto: {
    flex: "auto",
    overflow: "auto",
  },
}));

// Maps "variant" onto correct component & prop values
const miaLists = {
  moves: [PokemonMovesList, "pokemonMoves"],
  items: [PokemonItemsList, "pokemonItems"],
  abilities: [PokemonItemsList, "pokemonItems"],
};

const PokemonMIAList = ({ variant, data }) => {
  const [MIAComponent, dataPropName] = get(miaLists, variant);

  return <MIAComponent {...{ [dataPropName]: data }} />;
};

export default function PokemonDisplayMoves({ variant, pokemonMIAData }) {
  const classes = useStyles();

  const title = startCase(variant);

  return (
    <OutlinedDiv
      color="default"
      label={`${title} (${pokemonMIAData.length})`}
      classes={{ root: clsx(classes.fullHeight, classes.noBorder) }}
      inputClassName={clsx(classes.fullHeight, classes.overflowAuto)}
      inputRootClasses={clsx(
        classes.softBg,
        classes.noCursor,
        classes.fullHeight
      )}
    >
      <PokemonMIAList {...{ variant, data: pokemonMIAData }} />
    </OutlinedDiv>
  );
}

PokemonDisplayMoves.propTypes = {};
