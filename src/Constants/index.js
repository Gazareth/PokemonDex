import { SEARCH_POKEMON } from "Store/actions/types";

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
  [SEARCH_POKEMON.NONE]: "947 Available", //TODO: make dynamic
  [SEARCH_POKEMON.INIT]: "Starting search...",
  [SEARCH_POKEMON.FOUND]: "Searching for species...",
  [SEARCH_POKEMON.SPECIES_FOUND]: "Searching for moves...",
  [SEARCH_POKEMON.MOVES_FOUND]: "Pokemon moves found...",
  [SEARCH_POKEMON.DONE]: "Search complete!",
  [SEARCH_POKEMON.FAILED]: "Error. Pokemon not found.",
};
