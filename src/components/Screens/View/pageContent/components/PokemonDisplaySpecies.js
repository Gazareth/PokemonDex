import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import OutlinedDiv from "components/generic/OutlinedDiv";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  defaultCursor: {
    cursor: "default !important"
  },
  softBg: {
    backgroundColor: theme.palette.background.tertiary
  },
  genus: {
    fontStyle: "italic !important",
    fontSize: 11,
    color: theme.palette.text.disabled
  },
  flavorText: {
    fontSize: 12,
    fontStyle: "italic",
    color: theme.palette.text.secondary
  }
}));

const SpeciesInfo = ({ mainTheme, classes, pokemonSpecies }) => {
  return (
    <Box px={1} py={0.5}>
      <Typography variant="subtitle2" gutterBottom>
        {pokemonSpecies.name + " "}
        <Typography component="span" className={classes.genus}>
          {" • " + pokemonSpecies.genus}
        </Typography>
      </Typography>
      <Typography className={classes.flavorText}>
        {pokemonSpecies.flavorText}
      </Typography>
    </Box>
  );
};

export default function PokemonDisplaySpecies({ pokemonSpecies, show, delay }) {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <OutlinedDiv
      label="Species Info"
      {...{ show, delay }}
      inputRootClasses={clsx(classes.defaultCursor, classes.softBg)}
    >
      <SpeciesInfo {...{ classes, pokemonSpecies }}></SpeciesInfo>
    </OutlinedDiv>
  );
}

PokemonDisplaySpecies.propTypes = {
  post: PropTypes.object
};
