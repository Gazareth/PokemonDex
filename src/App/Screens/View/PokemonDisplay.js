import React, { useState, useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import useAnimEngine from "Hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";
import PokemonDisplayMain from "./Sections/PokemonCard";
import PokemonDisplayStats from "./Sections/PokemonDisplayStats";
import PokemonDisplaySpecies from "./Sections/PokemonDisplaySpecies";
import PokemonDisplayMoves from "./Sections/PokemonDisplayMovesModal";
import PokemonDisplayEvolutions from "./Sections/Evolutions";
import PokemonDisplayIDNav from "./Sections/PokemonDisplayIDNav";

const useStyles = makeStyles((theme) => ({
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "hidden",
  },
  statsAndBio: {
    flexGrow: "0.1",
    alignContent: "center",
  },
  movesButton: {
    flexGrow: "0",
    alignContent: "center",
  },
  evolutions: {
    flexGrow: "1",
    alignContent: "flex-start",
  },
  idNav: {
    flexGrow: "0",
    alignContent: "center",
  },
}));

const PokemonDisplay = ({
  displayContent,
  pokemonInfo,
  isFavourite,
  addToFavourites,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 250);
  }, []);

  const anim = useAnimEngine(6, displayContent && animateIn);

  return (
    <>
      <Grid container spacing={4} direction="column" style={{ height: "100%" }}>
        <Grid item>
          <PokemonDisplayMain
            {...{ pokemonInfo, isFavourite, addToFavourites }}
            {...anim()}
          />
        </Grid>
        <Grid item container spacing={4} className={classes.statsAndBio}>
          <Grid item container xs={12} sm={5}>
            <PokemonDisplayStats pokemonStats={pokemonInfo.stats} {...anim()} />
          </Grid>
          <Grid item container xs={12} sm={7}>
            <PokemonDisplaySpecies
              pokemonSpecies={pokemonInfo.species}
              {...anim()}
            />
          </Grid>
        </Grid>
        <Grid item container className={classes.movesButton}>
          <PokemonDisplayMoves
            displayContent={displayContent && animateIn}
            pokemonMoves={pokemonInfo.moves}
            {...anim()}
            doHeight
          />
        </Grid>
        <Grid
          item
          container
          className={classes.evolutions}
          style={{ paddingTop: "10%" }}
        >
          <PokemonDisplayEvolutions
            pokemonId={pokemonInfo.id}
            pokemonEvolutions={pokemonInfo.evolutions}
            {...anim()}
          />
        </Grid>
        <Grid item container className={classes.idNav} direction="column">
          <PokemonDisplayIDNav pokemonId={pokemonInfo.id} {...anim()} />
        </Grid>
      </Grid>
    </>
  );
};

export default PokemonDisplay;
