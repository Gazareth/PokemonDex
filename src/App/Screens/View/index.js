import React, { useState, useEffect, useMemo, useCallback } from "react";
import { connect } from "react-redux";

import { addFavourite, removeFavourite } from "Store/actions";

import PokemonDisplay from "./PokemonDisplay";
import PokemonNoDisplay from "./PokemonNoDisplay";

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemon.data,
    loading: state.pokemon.loading,
    havePokemon: state.pokemon.haveData,
    favourites: state.favourites,
  };
};

const mapDispatchToProps = {
  addFavourite,
  removeFavourite,
};

const getIsFavourite = (favourites, id) =>
  favourites.filter((fav) => fav.id === id).length > 0;

const PokemonPage = ({
  displayContent,
  pokemonData,
  havePokemon,
  favourites,
  addFavourite,
  removeFavourite,
}) => {
  //const dataArr = [pokemonData, pokemonSpeciesData, pokemonMovesData];
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => setIsFavourite(getIsFavourite(favourites, pokemonData.id)), [
    favourites.size,
    pokemonData.id,
    favourites,
  ]);

  //const addRemoveFavourite = useMemo(()=>,[isFavourite]);
  const addRemoveFavourite = useCallback(() => {
    console.log("ADDING/REMOVING FAVOURITE. Is favourite? ", isFavourite);
    isFavourite ? removeFavourite(pokemonData) : addFavourite(pokemonData);
  }, [addFavourite, isFavourite, pokemonData, removeFavourite]);

  // const pokemonInfo = useMemo(
  //   () => (havePokemon > 0 ? ParsePokemonData(...dataArr) : {}),
  //   [havePokemon, dataArr]
  // );

  return (
    <>
      {!havePokemon && <PokemonNoDisplay {...{ displayContent }} />}
      {havePokemon && (
        <PokemonDisplay
          {...{
            pokemonInfo: pokemonData,
            displayContent,
            isFavourite,
            addToFavourites: addRemoveFavourite,
          }}
        />
      )}
    </>
  );
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(PokemonPage)
);
