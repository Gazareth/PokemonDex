import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import PokemonCard from "Components/PokemonCard";

import useAnimEngine from "Hooks/AnimEngine";

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
  list: {
    margin: "2rem",
    width: "100%",
  },
}));

const mapStateToProps = (state) => {
  return {
    favourites: state.favourites,
    loading: state.pokemon.loading,
  };
};

const FavouritesPage = ({ displayContent, favourites }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 250);
  }, []);

  const anim = useAnimEngine(
    3,
    displayContent && animateIn,
    325 * favourites.length
  );

  console.log("FAVOURITES: ", favourites);

  return (
    <>
      <h2>Favourite Pokemon </h2>
      <Grid item container spacing={5} className={classes.flexCol}>
        <Grid item container spacing={4} className={classes.inflexible}>
          <List className={classes.list}>
            {favourites.map(
              (fav) =>
                console.log("FAVOURITE INFO: ", fav) || (
                  <PokemonCard
                    key={fav.id}
                    {...anim()}
                    variant="favourites"
                    pokemonInfo={fav}
                  />
                )
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(connect(mapStateToProps)(FavouritesPage));
