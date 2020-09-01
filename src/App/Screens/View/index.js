import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { SEARCH_POKEMON } from "Store/actions/types";

import { addFavourite, removeFavourite } from "Store/actions";

import PokemonDisplay from "./PokemonDisplay";
import PokemonNoDisplay from "./PokemonNoDisplay";

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemon.data,
    loading: state.pokemon.loading,
    searching: state.pokemon.searching,
    havePokemon: state.pokemon.haveData,
    favourites: state.favourites.favouritesOrder,
  };
};

const mapDispatchToProps = {
  addFavourite,
  removeFavourite,
};

const getIsFavourite = (favourites, id) =>
  favourites.filter((favId) => favId === id).length > 0;

const PokemonPage = ({
  displayContent,
  pokemonData,
  searching,
  havePokemon,
  loading,
  favourites,
  addFavourite,
  removeFavourite,
}) => {
  //const dataArr = [pokemonData, pokemonSpeciesData, pokemonMovesData];
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(getIsFavourite(favourites, pokemonData.id));
  }, [favourites.size, pokemonData.id, favourites]);

  //const addRemoveFavourite = useMemo(()=>,[isFavourite]);
  const addRemoveFavourite = useCallback(() => {
    isFavourite ? removeFavourite(pokemonData.id) : addFavourite(pokemonData);
  }, [addFavourite, isFavourite, pokemonData, removeFavourite]);

  return havePokemon === 0 ||
    (searching > 0 && havePokemon !== searching) ||
    ["INIT", "FOUND", "SPECIES_FOUND", "MOVES_FOUND", "DONE"]
      .map((key) => SEARCH_POKEMON[key])
      .includes(loading) ? (
    <PokemonNoDisplay {...{ displayContent }} />
  ) : (
    <PokemonDisplay
      {...{
        pokemonInfo: pokemonData,
        displayContent,
        isFavourite,
        addToFavourites: addRemoveFavourite,
      }}
    />
  );
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(PokemonPage)
);
