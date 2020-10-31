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
  [SEARCH_POKEMON.NONE]: "947 Available", //@todo make dynamic
  [SEARCH_POKEMON.INIT]: "Starting search...",
  [SEARCH_POKEMON.FOUND]: "Retrieving species info...",
  [SEARCH_POKEMON.SPECIES_FOUND]: "Scanning evolutions...",
  [SEARCH_POKEMON.EVOLUTION_CHAIN_FOUND]: "Retrieving evolutions...",
  [SEARCH_POKEMON.EVOLUTIONS_SPECIES_FOUND]: "Mapping out evolutions...",
  [SEARCH_POKEMON.EVOLUTIONS_FOUND]: "Compiling moves list...",
  [SEARCH_POKEMON.MOVES_FOUND]: "Finalising...",
  [SEARCH_POKEMON.DONE]: "Search complete!",
  [SEARCH_POKEMON.FAILED]: "Error. Pokemon not found.",
};
