import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import OutlinedDiv from "../../../externalComponents/OutlinedDiv";

const useStyles = makeStyles(theme => ({
  statsField: {
    cursor: "default !important"
  },
  statName: {
    fontVariant: "small-caps",
    display: "flex",
    whiteSpace: "nowrap"
  }
}));

const ItemName = ({ classes, name, key }) => (
  <Grid {...{ key }} container item spacing={4}>
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
);

const ItemNames = ({ pokemonItems, classes }) => (
  <Grid container p={10} style={{ cursor: "default !important" }}>
    {pokemonItems.map((name, key) => (
      <ItemName {...{ classes, name, key }} />
    ))}
  </Grid>
);

const ItemCount = ({ pokemonItems, classes }) => (
  <Typography
    component="div"
    className={classes.statName}
    variant="subtitle2"
    color="textSecondary"
    gutterBottom
  >
    {pokemonItems.length}
  </Typography>
);

const ItemsGroup = ({ classes, pokemonItems }) => {
  return false ? (
    <ItemNames {...{ classes, pokemonItems }} />
  ) : (
    <ItemCount {...{ classes, pokemonItems }} />
  );
};

export default function PokemonDisplayItems({ pokemonItems }) {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <OutlinedDiv label="Items" inputClasses={classes.statsField}>
      <ItemsGroup {...{ classes, pokemonItems }}></ItemsGroup>
    </OutlinedDiv>
  );
}

PokemonDisplayItems.propTypes = {
  post: PropTypes.object
};
