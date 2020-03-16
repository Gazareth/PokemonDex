import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchPokemon } from "store/actions";
import { SEARCH_POKEMON } from "store/actions/types";

import useAnimEngine from "hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";

import SearchPanel from "./pageContent/SearchPanel";

const mapStateToProps = state => {
  return {
    pokemonData: state.pokemon.data,
    pokemonSpeciesData: state.pokemon.species,
    pokemonMovesData: state.pokemon.moves,
    loading: state.pokemon.loading
  };
};

const mapDispatchToProps = {
  searchPokemon
};

//store.dispatch(searchPokemon("bulbasaur"));

const SearchPage = ({ displayContent, loading, searchPokemon }) => {
  const [loadingState, setLoadingState] = useState(loading);

  //let timeout;

  // const setLoadingStateTimeout = () => {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(() => setLoadingState(loading), 1000);
  // };

  useEffect(() => setLoadingState(loading), [loading]);

  const searchReady =
    displayContent &&
    (loadingState === SEARCH_POKEMON.NONE ||
      loadingState === SEARCH_POKEMON.DONE);

  const anim = useAnimEngine(3, displayContent, 450);

  return (
    <>
      <Grid item />
      <SearchPanel
        {...anim()}
        animMagnitude={100}
        {...{ anim, searchReady, loadingState, searchPokemon }}
      />
      {/* {!searchReady && <div>Loading: {loadingState}</div>} */}
      {/* {searchReady && (
        
      )} */}
      <Grid item style={{ height: "20%" }} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
