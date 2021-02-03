import { PRESEARCH_POKEMON, SEARCH_POKEMON } from "Store/actions/types";

export const POKEMON_DEX_PATHS = ["search", "view", "favourites"];

export const POKEMON_DATA_FIELDS = [
  "moves",
  "name",
  "sprites",
  "id",
  "types",
  "height",
  "weight",
  "stats",
  "held_items",
];

export const POKEMON_FAVOURITE_FIELDS = ["image", "name", "id", "types"];

export const LOADING_STRINGS = {
  [SEARCH_POKEMON.NONE]: "Loading...", //@todo make dynamic
  [SEARCH_POKEMON.INIT]: "Starting search...",
  [SEARCH_POKEMON.FOUND]: "Retrieving species...",
  [SEARCH_POKEMON.VARIETY_FOUND]: "Querying evolutions...",
  [SEARCH_POKEMON.EVOLUTION_CHAIN_FOUND]: "Evolutions resolved...",
  [SEARCH_POKEMON.EVOLUTIONS_SPECIES_FOUND]: "Mapping evolutions...",
  [SEARCH_POKEMON.EVOLUTIONS_FOUND]: "Compiling moves list...",
  [SEARCH_POKEMON.MOVES_FOUND]: "Finalising...",
  [SEARCH_POKEMON.DONE]: "Search complete!",
  [SEARCH_POKEMON.FAILED]: "Pokemon not found.",
};

export const PRELOAD_STRINGS = {
  [PRESEARCH_POKEMON.NONE]: "Waiting for initialisation...",
  [PRESEARCH_POKEMON.INIT]: "Initialising...",
  [PRESEARCH_POKEMON.DONE]: " - Available",
  [PRESEARCH_POKEMON.FAILED]: "Data network not accessible",
};
