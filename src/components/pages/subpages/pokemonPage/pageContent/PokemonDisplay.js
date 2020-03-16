import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import useAnimEngine from "hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";
import PokemonDisplayMain from "./components/PokemonDisplayMain";
import PokemonDisplayStats from "./components/PokemonDisplayStats";
import PokemonDisplaySpecies from "./components/PokemonDisplaySpecies";
import PokemonDisplayMoves from "./components/PokemonDisplayMoves";

const useStyles = makeStyles(theme => ({
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "hidden"
  },
  inflexible: {
    flex: "none"
  }
}));

const PokemonDisplay = ({ displayContent, pokemonInfo }) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  const anim = useAnimEngine(4, displayContent);

  return (
    <>
      <Grid item container spacing={5} className={classes.flexCol}>
        <Grid item container spacing={4} className={classes.inflexible}>
          <Grid item xs={12}>
            <PokemonDisplayMain pokemonInfo={pokemonInfo} {...anim()} />
          </Grid>
          <Grid item container xs={5}>
            <PokemonDisplayStats pokemonStats={pokemonInfo.stats} {...anim()} />
          </Grid>
          <Grid item container xs={7}>
            <PokemonDisplaySpecies
              pokemonSpecies={pokemonInfo.species}
              {...anim()}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.flexCol}>
          <PokemonDisplayMoves pokemonMoves={pokemonInfo.moves} {...anim()} />
        </Grid>
      </Grid>
    </>
  );
};

export default PokemonDisplay;
