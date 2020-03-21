import axios from "axios";
import { SEARCH_POKEMON } from "./types";

const apiUrl = "https://pokeapi.co/api/v2/";

const sleepTime = process.env.REACT_APP_APIINTERVAL;
const sleepErrorTime = process.env.REACT_APP_APIERRORCOOLDOWN;

const sleep = (sleepms = sleepTime) => response =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(response), sleepms)
  );

export const searchPokemon = pokemonName => {
  let speciesUrl = "",
    moves = [];

  return dispatch => {
    dispatch(setPokemonData(SEARCH_POKEMON.INIT));
    return axios
      .get(apiUrl + "pokemon/" + pokemonName)
      .then(sleep())
      .then(response => {
        speciesUrl = response.data.species.url;
        moves = response.data.moves;
        dispatch(setPokemonData(SEARCH_POKEMON.FOUND, response.data));
        return axios.get(speciesUrl);
      })
      .then(sleep())
      .then(response => {
        dispatch(setPokemonData(SEARCH_POKEMON.SPECIES_FOUND, response.data));
        return axios.all(getAllMoves(moves));
      })
      .then(sleep())
      .then(response => {
        dispatch(
          setPokemonData(
            SEARCH_POKEMON.MOVES_FOUND,
            response.map(resp => resp.data)
          )
        );
      })
      .then(sleep())
      .then(response => dispatch(setPokemonData(SEARCH_POKEMON.DONE)))
      .then(sleep(process.env.REACT_APP_TABSWITCHTIME))
      .then(response => dispatch(setPokemonData(SEARCH_POKEMON.NONE)))
      .catch(error => {
        dispatch(setPokemonError());
        setTimeout(
          () => dispatch(setPokemonData(SEARCH_POKEMON.NONE)),
          sleepErrorTime
        );
        throw error;
      });
  };
};

const getAllMoves = moves =>
  moves
    .filter(moveObj =>
      moveObj.version_group_details.reduce(
        (canLearn, versionObj) =>
          canLearn || versionObj.move_learn_method.name === "level-up",
        false
      )
    )
    .sort(
      (moveA, moveB) =>
        moveA.version_group_details[0].level_learned_at >
        moveB.version_group_details[0].level_learned_at
    )
    .map(moveObj => axios.get(moveObj.move.url));

const setPokemonData = (type, data) => {
  return {
    type,
    payload: data
  };
};

const setPokemonError = () => {
  return {
    type: SEARCH_POKEMON.FAILED
  };
};
