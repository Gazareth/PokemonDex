import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { preSearchPokemon, searchPokemon } from "Store/actions";
import { SEARCH_POKEMON } from "Store/actions/types";

import useAnimEngine from "Hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";

import SearchPanel from "./SearchPanel";

const mapStateToProps = (state) => {
  return {
    totalPokemon: state.presearch.count,
    preSearchState: state.presearch.loading,
    currentPokemon: state.pokemon.data,
    loadingPokemon: state.pokemon.loading,
    searchingPokemon: state.pokemon.searching,
  };
};

const mapDispatchToProps = {
  preSearchPokemon,
  searchPokemon,
};

const SearchPage = ({
  displayContent,
  totalPokemon,
  preSearchState,
  preSearchPokemon,
  loadingPokemon,
  searchingPokemon,
  currentPokemon,
  searchPokemon,
}) => {
  const [showContent, setShowContent] = useState(false);

  const searchReady = useMemo(
    () =>
      //displayContent &&
      !(searchingPokemon > 0) && loadingPokemon === SEARCH_POKEMON.NONE,
    [loadingPokemon, searchingPokemon]
  );

  // Presearch only once, when first mounted
  useEffect(() => {
    if (totalPokemon === 0) preSearchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setShowContent(displayContent);
    return () => setShowContent(false);
  }, [displayContent, setShowContent]);

  const anim = useAnimEngine(1, showContent, { delay: 275, duration: 475 });

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
            isBusy={!searchReady}
            searchingPokemon
            {...{
              anim,
              showContent,
              totalPokemon,
              preSearchState,
              searchingPokemon,
              currentPokemon,
              searchPokemon,
            }}
          />
        </Grid>
      </Grid>
      <Grid item style={{ flex: "auto" }} />
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
