import axios from "axios";
import axiosDelayed from "Utils/axios";
import { SEARCH_POKEMON, FAVOURITES, THEME } from "./types";

import ParsePokemonData from "Utils/parseData_pokemon";

import { POKEMON_FAVOURITE_FIELDS } from "Constants";

import pick from "Utils/pick";

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
  if (!pokemonName)
    return (dispatch) => {
      dispatch(setPokemonError());
      return setTimeout(
        () => dispatch(setPokemonData(SEARCH_POKEMON.NONE)),
        sleepErrorTime
      );
    };
  let pokemonId = 0;
  let pokemonData = {};
  let speciesUrl = "",
    evolutionsUrl = "";
  let evolutionChain = {},
    evolutions = [],
    moves = [];

  let movesData = [],
    speciesData = {};

  return (dispatch) => {
    dispatch(setPokemonData(SEARCH_POKEMON.INIT));
    return (
      axiosDelayed
        /***** MAIN *****/
        .get(apiUrl + "pokemon/" + pokemonName, { delay: preSearchDelay })
        .then(sleep())
        .then((response) => {
          pokemonData = response.data;
          pokemonId = pokemonData.id;
          speciesUrl = pokemonData.species.url;
          dispatch(setPokemonData(SEARCH_POKEMON.FOUND, pokemonId));
          /***** SPECIES *****/
          return axios.get(speciesUrl);
        })
        .then(sleep())
        .then((response) => {
          speciesData = response.data;
          dispatch(action(SEARCH_POKEMON.SPECIES_FOUND));
          /***** EVOLUTION CHAIN *****/
          evolutionsUrl = speciesData.evolution_chain;
          return axios.get(evolutionsUrl);
        })
        .then(sleep())
        .then((response) => {
          dispatch(action(SEARCH_POKEMON.EVOLUTION_CHAIN_FOUND));
          evolutionChain = response.chain;
          /***** EVOLUTIONS *****/
          return axios.all(getAllEvolutions(evolutionChain.chain));
        })
        .then(sleep())
        .then((response) => {
          dispatch(action(SEARCH_POKEMON.EVOLUTIONS_FOUND));
          /***** MOVES *****/
          return axios.all(getAllMoves(moves));
        })
        .then(sleep())
        .then((response) => {
          movesData = response.map((moveResponse) => moveResponse.data);
          dispatch(action(SEARCH_POKEMON.MOVES_FOUND));
        })
        .then(sleep())
        /***** DONE *****/
        .then(() =>
          dispatch(
            setPokemonData(
              SEARCH_POKEMON.DONE,
              ParsePokemonData(pokemonData, speciesData, movesData)
            )
          )
        )
        .then(sleep(process.env.REACT_APP_SWITCHSCREENDELAY))
        .then(() => dispatch(action(SEARCH_POKEMON.NONE)))
        .catch((error) => {
          dispatch(setPokemonError());
          setTimeout(
            () => dispatch(setPokemonData(SEARCH_POKEMON.NONE)),
            sleepErrorTime
          );
          throw error;
        })
    );
  };
};

const getAllEvolutions = (evolutionChain) => {
  let species = [];
  let unresolved = [];

  if (evolutionChain.species.name === "") {
    return;
  }

  species.push(evolutionChain.species);
  unresolved = evolutionChain.evolves_to;
  console.log("INITIAL PUSH: ", species, unresolved);

  while (unresolved.length > 0) {
    const currentEvol = unresolved.pop();
    species.push(currentEvol.species);
    unresolved = [...unresolved, ...currentEvol.evolves_to];
  }
  return species.map((spec) => spec.url);
};

const getAllMoves = (moves) =>
  moves
    .filter((moveObj) =>
      moveObj.version_group_details.some(
        (versionObj) => versionObj.move_learn_method.name === "level-up"
      )
    )
    .sort(
      (moveA, moveB) =>
        moveA.version_group_details[0].level_learned_at >
        moveB.version_group_details[0].level_learned_at
    )
    .map((moveObj) => axios.get(moveObj.move.url));

const action = (type) => ({
  type,
});

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
export const addFavourite = (pokemonData) => ({
  type: FAVOURITES.ADD,
  payload: pick(pokemonData, POKEMON_FAVOURITE_FIELDS),
});

export const removeFavourite = (index) => ({
  type: FAVOURITES.REMOVE,
  payload: index,
});

export const moveFavourite = (sourceIndex, destIndex, favouriteId) => ({
  type: FAVOURITES.REORDER,
  payload: {
    sourceIndex,
    destIndex,
    favouriteId,
  },
});

export const reorderFavourites = () => ({
  type: FAVOURITES.COMMIT_REORDER,
});

export const cancelReorderFavourites = () => ({
  type: FAVOURITES.CANCEL_REORDER,
});

/***********
 *
 * THEME ACTIONS
 *
 *************/
const ThemeMap = {
  dark: THEME.SET_DARK_MODE,
  light: THEME.SET_LIGHT_MODE,
};

//THEME
export const setThemeMode = (mode) => ({ type: ThemeMap[mode] });
