export const SEARCH_POKEMON = Object.freeze({
  NONE: "POKEMON_NONE",
  INIT: "POKEMON_SEARCH",
  FOUND: "POKEMON_FOUND",
  SPECIES_FOUND: "POKEMON_SPECIES_FOUND",
  EVOLUTION_CHAIN_FOUND: "POKEMON_EVOLUTION_CHAIN_FOUND",
  EVOLUTIONS_SPECIES_FOUND: "POKEMON_EVOLUTIONS_FOUND",
  EVOLUTIONS_FOUND: "POKEMON_EVOLUTIONS_FOUND",
  MOVES_FOUND: "POKEMON_ABILITIES_FOUND",
  DONE: "POKEMON_SEARCH_COMPLETE",
  FAILED: "POKEMON_SEARCH_FAILED",
});

export const THEME = Object.freeze({
  SET_DARK_MODE: "THEME_SET_DARK",
  SET_LIGHT_MODE: "THEME_SET_LIGHT",
});

export const FAVOURITES = Object.freeze({
  ADD: "ADD_FAVOURITE",
  REMOVE: "DELETE_FAVOURITE",
  REORDER: "REORDER_FAVOURITE",
  COMMIT_REORDER: "COMMIT_REORDER_FAVOURITES",
  CANCEL_REORDER: "CANCEL_REORDER_FAVOURITES",
});
