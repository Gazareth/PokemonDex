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

const initialOrder = initialFavourites.map(({ id }) => id);

const favouritesReducer = (
  state = { favourites: initialFavourites, favouritesOrder: initialOrder },
  action
) => {
  switch (action.type) {
    case FAVOURITES.ADD:
      const newFavourites = [action.payload, ...state.favourites];
      const newIds = newFavourites.map((fav) => fav.id);
      return {
        ...state,
        favourites: newFavourites,
        favouritesOrder: newIds,
      };
    case FAVOURITES.REORDER:
      console.log(
        "REORDERING FAVOURITES",
        action.payload,
        "OLD ORDER: ",
        state.favouritesOrder
      );
      let order = [...state.favouritesOrder];
      order.splice(action.payload.sourceIndex, 1);
      order.splice(action.payload.destIndex, 0, action.payload.favouriteId);
      console.log("NEW ORDER: ", order);
      return {
        ...state,
        favouritesOrder: order,
      };
    case FAVOURITES.COMMIT_REORDER:
      const reorderedFavourites = state.favouritesOrder.map((favId) =>
        state.favourites.find(({ id }) => id === favId)
      );
      return {
        ...state,
        favourites: reorderedFavourites,
      };
    case FAVOURITES.CANCEL_REORDER:
      return {
        ...state,
        favouritesOrder: state.favourites.map(({ id }) => id),
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
