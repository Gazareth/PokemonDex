import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addFavourite, removeFavourite } from "Store/actions";

import PokemonDisplay from "./PokemonDisplay";
import PokemonNoDisplay from "./PokemonNoDisplay";

import ParsePokemonData from "Utils/parseData_pokemon";

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemon.data,
    pokemonSpeciesData: state.pokemon.species,
    pokemonMovesData: state.pokemon.moves,
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
  pokemonSpeciesData,
  pokemonMovesData,
  havePokemon,
  favourites,
  addFavourite,
  removeFavourite,
}) => {
  const dataArr = [pokemonData, pokemonSpeciesData, pokemonMovesData];
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => setIsFavourite(getIsFavourite(favourites, pokemonData.id)), [
    favourites.size,
    pokemonData.id,
    favourites,
  ]);

  //const addRemoveFavourite = useMemo(()=>,[isFavourite]);
  const addRemoveFavourite = () => {
    console.log("ADDING/REMOVING FAVOURITE. Is favourite? ", isFavourite);
    isFavourite ? removeFavourite(pokemonData) : addFavourite(pokemonData);
  };

  return (
    <>
      {!havePokemon && <PokemonNoDisplay {...{ displayContent }} />}
      {havePokemon && (
        <PokemonDisplay
          {...{
            pokemonInfo: ParsePokemonData(...dataArr),
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
