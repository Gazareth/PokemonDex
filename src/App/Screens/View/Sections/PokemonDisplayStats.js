import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import OutlinedDiv from "Components/OutlinedDiv";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  defaultCursor: {
    cursor: "default !important",
  },
  alignTextRight: {
    justifyContent: "right",
  },
  statName: {
    fontVariant: "small-caps",
    display: "flex",
    whiteSpace: "nowrap",
  },
  softBg: {
    backgroundColor: theme.palette.background.tertiary,
  },
}));

const StatsGroup = ({ classes, pokemonStats }) => {
  return (
    <Box px={3} py={2}>
      <Grid container>
        {pokemonStats.map(({ name, value }, key) => (
          <Grid {...{ key }} container item spacing={2}>
            <Grid container item xs={3} className={classes.alignTextRight}>
              <Typography variant="subtitle2" gutterBottom>
                {value}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography
                component="div"
                className={classes.statName}
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                {name}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default function PokemonDisplayStats({ pokemonStats, show, delay }) {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <OutlinedDiv
      label="Stats"
      {...{ show, delay }}
      inputRootClasses={clsx(classes.defaultCursor, classes.softBg)}
    >
      <StatsGroup {...{ classes, pokemonStats }}></StatsGroup>
    </OutlinedDiv>
  );
}

PokemonDisplayStats.propTypes = {
  post: PropTypes.object,
};
