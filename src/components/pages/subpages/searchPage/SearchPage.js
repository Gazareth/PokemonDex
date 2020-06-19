import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchPokemon } from "store/actions";
import { SEARCH_POKEMON } from "store/actions/types";

import useAnimEngine from "hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";

import SearchPanel from "./pageContent/SearchPanel";

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemon.data,
    pokemonSpeciesData: state.pokemon.species,
    pokemonMovesData: state.pokemon.moves,
    loading: state.pokemon.loading,
  };
};

const mapDispatchToProps = {
  searchPokemon,
};

//store.dispatch(searchPokemon("bulbasaur"));

const SearchPage = ({ displayContent, loading, searchPokemon }) => {
  const [loadingState, setLoadingState] = useState(loading);

  useEffect(() => setLoadingState(loading), [loading]);

  const searchReady =
    displayContent &&
    (loadingState === SEARCH_POKEMON.NONE ||
      loadingState === SEARCH_POKEMON.DONE);

  const anim = useAnimEngine(3, displayContent, 450);

  return (
    <Grid
      container
      direction="row"
      style={{ height: "100%", flexFlow: "column", alignItems: "stretch" }}
    >
      <Grid item style={{ flex: "auto", flexGrow: "0.5" }} />
      <Grid item container style={{ alignContent: "center", flex: "auto" }}>
        <Grid item style={{ width: "100%" }}>
          <SearchPanel
            {...anim()}
            animMagnitude={100}
            {...{ anim, searchReady, loadingState, searchPokemon }}
          />
        </Grid>
      </Grid>
      <Grid item style={{ flex: "auto" }} />
    </Grid>
  );
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(SearchPage)
);
