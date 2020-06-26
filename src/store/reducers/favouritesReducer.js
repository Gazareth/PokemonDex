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

const favouritesReducer = (state = initialFavourites, action) => {
  switch (action.type) {
    case FAVOURITES.ADD:
      return [action.payload, ...state];
    case FAVOURITES.REMOVE:
      return [...state].filter((fav) => fav.id !== action.payload);
    default:
      return state;
  }
};

export default favouritesReducer;
