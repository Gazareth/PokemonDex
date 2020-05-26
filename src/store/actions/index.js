import axios from "axios";
import axiosDelayed from "util/axios";
import { SEARCH_POKEMON, FAVOURITES, THEME } from "./types";

/***********
 *
 * POKEMON ACTIONS
 *
 *************/
const apiUrl = "https://pokeapi.co/api/v2/";

const preSearchDelay = process.env.REACT_APP_SEARCHINITDELAY;
const sleepTime = process.env.REACT_APP_APIINTERVAL;
const sleepErrorTime = process.env.REACT_APP_APIERRORCOOLDOWN;

const sleep = (sleepms = sleepTime) => (response) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(response), sleepms)
  );

export const searchPokemon = (pokemonName) => {
  let pokemonId = 0;
  let speciesUrl = "",
    moves = [];

  return (dispatch) => {
    dispatch(setPokemonData(SEARCH_POKEMON.INIT));
    return axiosDelayed
      .get(apiUrl + "pokemon/" + pokemonName, { delay: preSearchDelay })
      .then(sleep())
      .then((response) => {
        pokemonId = response.data.id;
        speciesUrl = response.data.species.url;
        moves = response.data.moves;
        dispatch(setPokemonData(SEARCH_POKEMON.FOUND, response.data));
        return axios.get(speciesUrl);
      })
      .then(sleep())
      .then((response) => {
        dispatch(setPokemonData(SEARCH_POKEMON.SPECIES_FOUND, response.data));
        return axios.all(getAllMoves(moves));
      })
      .then(sleep())
      .then((response) => {
        dispatch(
          setPokemonData(
            SEARCH_POKEMON.MOVES_FOUND,
            response.map((resp) => resp.data)
          )
        );
      })
      .then(sleep())
      .then((response) =>
        dispatch(setPokemonData(SEARCH_POKEMON.DONE, pokemonId))
      )
      .then(sleep(process.env.REACT_APP_TABSWITCHTIME))
      .then((response) => dispatch(setPokemonData(SEARCH_POKEMON.NONE)))
      .catch((error) => {
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
    .map((moveObj) => axios.get(moveObj.move.url));

const setPokemonData = (type, data) => {
  return {
    type,
    payload: data,
  };
};

const setPokemonError = () => {
  return {
    type: SEARCH_POKEMON.FAILED,
  };
};

/***********
 *
 * FAVOURITES ACTIONS
 *
 *************/
export const addFavourite = pokemonData => ({
  type: FAVOURITES.ADD,
  payload: pokemonData
});

export const removeFavourite = pokemonData => ({
  type: FAVOURITES.REMOVE,
  payload: pokemonData.id
});

/***********
 *
 * THEME ACTIONS
 *
 *************/
const ThemeMap = {
  dark: THEME.SET_DARK_MODE,
  light: THEME.SET_LIGHT_MODE
};

//THEME
export const setThemeMode = mode => ({ type: ThemeMap[mode] });
