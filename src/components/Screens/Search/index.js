import React, { useState, useEffect, useRef, useMemo } from "react";
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
    loadingPokemon: state.pokemon.loading,
  };
};

const mapDispatchToProps = {
  searchPokemon,
};

const SearchPage = ({ displayContent, loadingPokemon, searchPokemon }) => {
  const [showContent, setShowContent] = useState(false);

  const searchReady = useMemo(
    () =>
      displayContent &&
      (loadingPokemon === SEARCH_POKEMON.NONE ||
        loadingPokemon === SEARCH_POKEMON.DONE),
    [displayContent, loadingPokemon]
  );

  useEffect(() => {
    setShowContent(displayContent);
    return () => setShowContent(false);
  }, [displayContent, setShowContent]);

  const anim = useAnimEngine(3, showContent, 450);

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
            loadingState={loadingPokemon}
            {...{ anim, searchReady, searchPokemon }}
          />
        </Grid>
      </Grid>
      <Grid item style={{ flex: "auto" }} />
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
