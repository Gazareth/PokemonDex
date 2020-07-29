import React, { useState, useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import useAnimEngine from "Hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";
import PokemonDisplayMain from "Components/PokemonCard";
import PokemonDisplayStats from "./Sections/PokemonDisplayStats";
import PokemonDisplaySpecies from "./Sections/PokemonDisplaySpecies";
import PokemonDisplayMoves from "./Sections/PokemonDisplayMovesModal";

const useStyles = makeStyles((theme) => ({
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "hidden",
  },
  inflexible: {
    flex: "none",
  },
}));

const PokemonDisplay = ({
  displayContent,
  pokemonInfo,
  isFavourite,
  addToFavourites,
}) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 250);
  }, []);

  const anim = useAnimEngine(4, displayContent && animateIn);

  return (
    <>
      <Grid item container spacing={5} className={classes.flexCol}>
        <Grid item container spacing={4} className={classes.inflexible}>
          <Grid item xs={12}>
            <PokemonDisplayMain
              {...{ pokemonInfo, isFavourite, addToFavourites }}
              {...anim()}
            />
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
          <PokemonDisplayMoves
            pokemonMoves={pokemonInfo.moves}
            {...anim()}
            doHeight
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PokemonDisplay;
