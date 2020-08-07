import React, { useMemo } from "react";

import { useLocation, useHistory } from "react-router";

import queryString from "query-string";

import PokemonDexScreens from "./Screens";

import { POKEMON_DEX_PATHS as PokemonDexURLs } from "Constants";

const getIndexFromPath = ({ pathname: path }) => {
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

  let screenIndex = useMemo(
    () => getIndexFromPath(location, location, history),
    [history, location]
  );

  if (screenIndex === -1) {
    //redirect to search page if nothing found
    screenIndex = 0;
    const indexPath = getPathFromIndex(screenIndex);
    console.log("redirecting!", indexPath);
    history.push(indexPath);
  }

  // Pass pokemon ID if view/?id=<number>
  const query = location.search && queryString.parse(location.search).id;
  //console.log("Got query: ", query);
  const pokemonToView = validateQuery(query) ? parseInt(query, 10) : 0;
  console.log("ToView: ", pokemonToView);

  return (
    <PokemonDexScreens {...{ screenIndex }} searchingPokemon={pokemonToView} />
  );
};

export default PokemonRouter;
