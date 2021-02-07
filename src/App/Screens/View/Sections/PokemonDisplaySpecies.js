import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import Color from "color";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import OutlinedDiv from "Components/OutlinedDiv";

const useStyles = makeStyles((theme) => ({
  defaultCursor: {
    cursor: "default !important",
  },
  softBg: {
    ...theme.panelStylesWeak,
  },
  panelBorder: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        ...theme.panelBorderWeak,
      },
      "&:hover fieldset": {
        ...theme.panelBorderWeak,
      },
    },
  },
  genus: {
    fontStyle: "italic !important",
    fontSize: 11,
    color: theme.palette.text.disabled,
  },
  flavorText: {
    fontSize: 12,
    fontStyle: "italic",
    color: theme.palette.text.secondary,
  },
}));

const mixWithDisabled = (col, disabled) => Color(col).mix(Color(disabled), 0.5);

const SpeciesGenderRate = ({ genderRate }) => {
  const theme = useTheme();
  const malePct = 100 * ((8 - genderRate) / 8);
  const femPct = (100 * genderRate) / 8;

  return (
    <span style={{ fontStyle: "normal" }}>
      {" • "}
      <span
        style={{
          color: mixWithDisabled(
            theme.palette.info.main,
            theme.palette.text.disabled
          ),
        }}
      >
        <span role="img" aria-label="male sign">
          ♂️
        </span>
        &#8202;
        {malePct}%
      </span>{" "}
      <span
        style={{
          color: mixWithDisabled(
            theme.palette.secondary.main,
            theme.palette.text.disabled
          ),
        }}
      >
        <span role="img" aria-label="female sign">
          ♀️
        </span>
        &#8202;
        {femPct}%
      </span>
    </span>
  );
};

const SpeciesInfo = ({ classes, pokemonSpecies }) => {
  return (
    <Box px={1} py={0.5}>
      <Typography variant="subtitle2" gutterBottom>
        {pokemonSpecies.name + " "}
        <Typography component="span" className={classes.genus}>
          {" • " + pokemonSpecies.genus}
          {pokemonSpecies.gender && pokemonSpecies.gender > -1 && (
            <SpeciesGenderRate genderRate={pokemonSpecies.gender} />
          )}
        </Typography>
      </Typography>
      <Typography className={classes.flavorText}>
        {pokemonSpecies.flavorText}
      </Typography>
    </Box>
  );
};

export default function PokemonDisplaySpecies({ pokemonSpecies, show, delay }) {
  const classes = useStyles();

  return (
    <OutlinedDiv
      label="Species Info"
      {...{ show, delay }}
      classes={{ root: classes.panelBorder }}
      inputRootClasses={clsx(classes.defaultCursor, classes.softBg)}
    >
      <SpeciesInfo {...{ classes, pokemonSpecies }}></SpeciesInfo>
    </OutlinedDiv>
  );
}

PokemonDisplaySpecies.propTypes = {
  post: PropTypes.object,
};
