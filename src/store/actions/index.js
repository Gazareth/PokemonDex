import axios from "axios";
import axiosDelayed from "Utils/axios";
import {
  PRESEARCH_POKEMON,
  SEARCH_POKEMON,
  FAVOURITES,
  THEME,
  API_INTERVAL,
  META,
} from "./types";

import startCase from "lodash/startCase";
import pick from "lodash/pick";

import ParsePokemonData from "Utils/parseData_pokemon";

import { POKEMON_FAVOURITE_FIELDS } from "Constants";

/***********
 *
 * POKEMON ACTIONS
 *
 *************/
const apiUrl = "https://pokeapi.co/api/v2/";

const preSearchDelay = process.env.REACT_APP_SEARCHINITDELAY;
const sleepTime = process.env.REACT_APP_APIINTERVAL;
const sleepErrorTime = process.env.REACT_APP_APIERRORCOOLDOWN;

const genericSleep = (sleepms = sleepTime) => (response) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(response), sleepms)
  );

export const preSearchPokemon = () => {
  return (dispatch) => {
    dispatch({
      type: PRESEARCH_POKEMON.INIT,
    });
    return axiosDelayed
      .get(`${apiUrl}pokemon-species/`, {
        delay: preSearchDelay,
      })
      .then(({ data: RESP_presearch }) => {
        dispatch({
          type: PRESEARCH_POKEMON.DONE,
          payload: RESP_presearch.count,
        });
      })
      .catch((error) => {
        console.log("Pre-search error - ", error);
        dispatch({
          type: PRESEARCH_POKEMON.FAILED,
        });
      });
  };
};

export const searchPokemon = (pokemonName, interval = sleepTime) => {
  const sleep = () => genericSleep(interval);

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
  let varietyUrl = "",
    evolutionsUrl = "";
  let moves = [];

  let movesData = [],
    evolutionsData = [],
    varietyData = {};

  return (dispatch) => {
    dispatch(setPokemonData(SEARCH_POKEMON.INIT));
    return (
      axiosDelayed
        /***** MAIN *****/
        .get(`${apiUrl}pokemon-species/${pokemonName}`, {
          delay: preSearchDelay,
        })
        .then(sleep())
        .then(({ data: RESP_pokemon }) => {
          pokemonData = RESP_pokemon;
          pokemonId = pokemonData.id;
          varietyUrl = pokemonData.varieties.filter(
            (variety) => variety.is_default
          )[0].pokemon.url;
          evolutionsUrl = pokemonData.evolution_chain.url;

          pokemonData.name = pokemonData.names.filter(
            ({ language }) => language.name === "en"
          )[0].name;
          dispatch(
            setPokemonData(SEARCH_POKEMON.FOUND, {
              name: startCase(pokemonData.name),
              id: pokemonId,
            })
          );
          /***** SPECIES *****/
          return axios.get(varietyUrl);
        })
        .then(sleep())
        .then(({ data: RESP_variety }) => {
          varietyData = RESP_variety;
          moves = varietyData.moves;
          dispatch(action(SEARCH_POKEMON.VARIETY_FOUND));
          /***** EVOLUTION CHAIN *****/
          return axios.get(evolutionsUrl);
        })
        .then(sleep())
        .then(({ data: RESP_evolutionChain }) => {
          dispatch(action(SEARCH_POKEMON.EVOLUTION_CHAIN_FOUND));
          /***** EVOLUTIONS SPECIES *****/
          return axios.all(
            getAllEvolutions(RESP_evolutionChain.chain).map((evol) =>
              axios.get(evol.url)
            )
          );
        })
        .then(sleep())
        .then((RESP_evolutionSpecies) => {
          dispatch(action(SEARCH_POKEMON.EVOLUTIONS_SPECIES_FOUND));
          /***** EVOLUTIONS *****/
          return axios.all(
            RESP_evolutionSpecies.map((evolSpec) =>
              axios.get(
                apiUrl +
                  "pokemon/" +
                  evolSpec.data.pokedex_numbers[0].entry_number
              )
            )
          );
        })
        .then(sleep())
        .then((RESP_evolutionPokemon) => {
          dispatch(action(SEARCH_POKEMON.EVOLUTIONS_FOUND));
          evolutionsData = RESP_evolutionPokemon.map(
            (evolPkmn) => evolPkmn.data
          );

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
              ParsePokemonData(
                pokemonData,
                varietyData,
                evolutionsData,
                movesData
              )
            )
          )
        )
        .then(genericSleep(process.env.REACT_APP_SWITCHSCREENDELAY))
        .then(() => dispatch(action(SEARCH_POKEMON.NONE)))
        .catch((error) => {
          console.log("Data fetch error - ", error);
          dispatch(setPokemonError());
          setTimeout(
            () => dispatch(setPokemonData(SEARCH_POKEMON.NONE)),
            sleepErrorTime
          );
          // throw error;
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

  while (unresolved.length > 0) {
    const currentEvol = unresolved.pop();
    species.push(currentEvol.species);
    unresolved = [...unresolved, ...currentEvol.evolves_to];
  }
  return species;
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

export const setApiInterval = (value) => ({
  type: API_INTERVAL.SET,
  payload: value,
});

/***********
 *
 * META ACTIONS
 *
 *************/
export const importData = (data) => ({ type: META.IMPORT, payload: data });

export const clearData = () => ({ type: META.RESET });
