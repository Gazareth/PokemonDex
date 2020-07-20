import { FAVOURITES } from "../actions/types";

const initialFavourites = [
  {
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png",
    name: "Gloom",
    id: 44,
    types: ["Grass", "Poison"],
  },
  {
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
    name: "Paras",
    id: 46,
    types: ["Bug", "Grass"],
  },
  {
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png",
    name: "Venomoth",
    id: 49,
    types: ["Bug", "Poison"],
  },
  {
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png",
    name: "Venonat",
    id: 48,
    types: ["Bug", "Poison"],
  },
  {
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
    name: "Gyarados",
    id: 130,
    types: ["Water", "Flying"],
  },
  {
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
    name: "Magikarp",
    id: 129,
    types: ["Water"],
  },
];

const favouritesReducer = (
  state = { favourites: initialFavourites, favouritesDisplayOrder: [] },
  action
) => {
  switch (action.type) {
    case FAVOURITES.ADD:
      const newFavourites = [action.payload, ...state.favourites];
      const newIds = newFavourites.map((fav) => fav.id);
      return {
        ...state,
        favourites: newFavourites,
        favouritesDisplayOrder: newIds,
      };
    case FAVOURITES.REMOVE:
      const cleansedFavourites = state.favourites.filter(
        (fav) => fav.id !== action.payload
      );
      const cleansedIds = newFavourites.map((fav) => fav.id);
      return {
        ...state,
        favourites: cleansedFavourites,
        favouritesDisplayOrder: cleansedIds,
      };
    default:
      return state;
  }
};

export default favouritesReducer;
