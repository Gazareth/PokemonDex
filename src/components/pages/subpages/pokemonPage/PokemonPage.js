import React from "react";
import { connect } from "react-redux";
import { SEARCH_POKEMON } from "store/actions/types";

import PokemonDisplay from "./pageContent/PokemonDisplay";
import PokemonNoDisplay from "./pageContent/PokemonNoDisplay";

import ParsePokemonData from "util/parseData_pokemon";

const mapStateToProps = state => {
  return {
    pokemonData: state.pokemon.data,
    pokemonSpeciesData: state.pokemon.species,
    pokemonMovesData: state.pokemon.moves,
    loading: state.pokemon.loading
  };
};

// const checkData = dataSet => {
//   return dataSet.reduce(
//     (have, obj) => have && Object.entries(obj).length > 0,
//     true
//   );
// };

const PokemonPage = ({
  displayContent,
  pokemonData,
  pokemonSpeciesData,
  pokemonMovesData,
  loading
}) => {
  const dataArr = [pokemonData, pokemonSpeciesData, pokemonMovesData];

  const loadingDone = loading === SEARCH_POKEMON.DONE;

  return (
    <>
      {!loadingDone && <PokemonNoDisplay />}
      {loadingDone && (
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
