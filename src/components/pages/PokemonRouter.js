import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { useLocation, useHistory } from "react-router";

import queryString from "query-string";

import { searchPokemon } from "store/actions";
import { SEARCH_POKEMON } from "store/actions/types";

import TabbedScreens from "./TabbedScreens";

const PokemonDexURLs = ["search", "view", "favourites"];

const getIndexFromPath = (path) => {
  const pathPage = path.split("/")[1];
  const pageIndex = PokemonDexURLs.findIndex((endpt) =>
    pathPage.startsWith(endpt)
  );
  return pageIndex;
};

const getPathFromIndex = (index) => {
  return `/${PokemonDexURLs[index]}/`;
};

const validateQuery = (query) => {
  return !isNaN(query);
};

const PokemonRouter = ({ loading, havePokemon, searchPokemon }) => {
  const location = useLocation();
  const history = useHistory();
  let tabIndex = getIndexFromPath(location.pathname);

  if (tabIndex === -1) {
    //redirect to search page if nothing found
    tabIndex = 0;
    history.push(getPathFromIndex(tabIndex));
  } else if (tabIndex === 1) {
    //start pokemon search if view/?id=<number>
    const query = location.search && queryString.parse(location.search).id;
    const searchId = validateQuery(query) ? parseInt(query, 10) : 0;
    console.log(
      " SEARCH ID IS: ",
      searchId,
      " HAVE ID IS: ",
      havePokemon,
      " LOADING IS: ",
      loading,
      " TAB INDEX IS",
      tabIndex
    );
    if (
      searchId > 0 &&
      searchId !== havePokemon &&
      loading === SEARCH_POKEMON.NONE
    ) {
      console.log("SEARCHING!!!!");
      console.log("SEARCHING!!!!");
      console.log("SEARCHING!!!!");
      searchPokemon(searchId);
      //tabIndex = 1;
    }
  }

  const setPagePathIndex = useCallback(
    (index) => {
      if (index !== tabIndex) history.push(getPathFromIndex(index));
    },
    [history, tabIndex]
  );

  return <TabbedScreens pagePathIndex={tabIndex} {...{ setPagePathIndex }} />;
};

const mapStateToProps = (state) => {
  return {
    loading: state.pokemon.loading,
    havePokemon: state.pokemon.haveData,
  };
};

const mapDispatchToProps = {
  searchPokemon,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonRouter);
