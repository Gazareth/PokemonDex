import React from "react";

import { useLocation, useHistory } from "react-router";

import queryString from "query-string";

import PokemonDexScreens from "./TabbedScreens";

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

/** ******************************************************************
 * -- PokemonDexRouter --
 *  This component simply parses the URL parameters
 *  and passes down the parsed information:
 *      i.e. which sheet should be visible and which pokemon is being searched
 ******************************************************************  */
const PokemonRouter = () => {
  const location = useLocation();
  const history = useHistory();
  let screenIndex = getIndexFromPath(location.pathname);

  if (screenIndex === -1) {
    //redirect to search page if nothing found
    screenIndex = 0;
    history.push(getPathFromIndex(screenIndex));
  }

  // Pass pokemon ID if view/?id=<number>
  const query = location.search && queryString.parse(location.search).id;
  const viewingPokemon = validateQuery(query) ? parseInt(query, 10) : 0;

  return <PokemonDexScreens {...{ screenIndex, viewingPokemon }} />;
};

export default PokemonRouter;
