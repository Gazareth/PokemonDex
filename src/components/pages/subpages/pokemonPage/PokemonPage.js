import React from "react";
import { connect } from "react-redux";

import PokemonDisplay from "./pageContent/PokemonDisplay";
import PokemonNoDisplay from "./pageContent/PokemonNoDisplay";

import ParsePokemonData from "util/parseData_pokemon";

const mapStateToProps = state => {
  return {
    pokemonData: state.pokemon.data,
    pokemonSpeciesData: state.pokemon.species,
    pokemonMovesData: state.pokemon.moves,
    loading: state.pokemon.loading,
    havePokemon: state.pokemon.haveData
  };
};

const PokemonPage = ({
  displayContent,
  pokemonData,
  pokemonSpeciesData,
  pokemonMovesData,
  loading,
  havePokemon
}) => {
  const dataArr = [pokemonData, pokemonSpeciesData, pokemonMovesData];

  return (
    <>
      {!havePokemon && <PokemonNoDisplay {...{ displayContent }} />}
      {havePokemon && (
        <PokemonDisplay
          {...{
            pokemonInfo: ParsePokemonData(...dataArr),
            displayContent
          }}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps)(PokemonPage);
