import React, { useState, useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import useAnimEngine from "Hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";
import PokemonDisplayMain from "./Sections/PokemonCard";
import PokemonDisplayStats from "./Sections/PokemonDisplayStats";
import PokemonDisplaySpecies from "./Sections/PokemonDisplaySpecies";
import PokemonDisplayMIA from "./Sections/PokemonDisplayMIAs";
import PokemonDisplayEvolutions from "./Sections/Evolutions";
import PokemonDisplayIDNav from "./Sections/PokemonDisplayIDNav";

const useStyles = makeStyles((theme) => ({
  displayContainer: {
    height: "100%",
    flexWrap: "nowrap",
    flexGrow: "1",
  },
  mainCard: {
    [theme.breakpoints.down("xs")]: {
      margin: "calc(7px + 1vh + 1vw) 0 0",
    },
  },
  statsAndBio: {
    flexGrow: "0.1",
    alignContent: "center",
  },
  miaButtons: {
    //flexGrow: "0",
    //padding: "0 1vw",
    alignContent: "center",
    "&>div": {
      flexGrow: "0.2",
    },
  },
  evolutions: {
    flexGrow: "1",
    alignContent: "flex-start",
  },
  idNav: {
    margin: "2vh 0",
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

  const anim = useAnimEngine(
    7,
    displayContent && animateIn,
    { duration: 275 },
    65,
    1.25
  );

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      wrap="nowrap"
      justify="space-between"
      style={{ height: "100%" }}
    >
      <Grid item className={classes.mainCard}>
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
      <Grid
        item
        container
        justify="space-evenly"
        className={classes.miaButtons}
      >
        <Grid item>
          <PokemonDisplayMIA
            pokemonName={pokemonInfo.name}
            variant="moves"
            displayContent={displayContent && animateIn}
            pokemonMIAData={pokemonInfo.moves}
            {...anim()}
            doHeight
          />
        </Grid>
        <Grid item>
          <PokemonDisplayMIA
            pokemonName={pokemonInfo.name}
            variant="items"
            displayContent={displayContent && animateIn}
            pokemonMIAData={pokemonInfo.moves}
            {...anim()}
            doHeight
          />
        </Grid>
        <Grid item>
          <PokemonDisplayMIA
            pokemonName={pokemonInfo.name}
            variant="abilities"
            displayContent={displayContent && animateIn}
            pokemonMIAData={pokemonInfo.moves}
            {...anim()}
            doHeight
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        className={classes.evolutions}
        style={{ paddingTop: "2.5vh" }}
      >
        <PokemonDisplayEvolutions
          pokemonId={pokemonInfo.id}
          pokemonEvolutions={pokemonInfo.evolutions}
          {...anim()}
        />
      </Grid>
      <Grid item container className={classes.idNav}>
        <PokemonDisplayIDNav pokemonId={pokemonInfo.id} {...anim()} />
      </Grid>
    </Grid>
  );
};

export default PokemonDisplay;
