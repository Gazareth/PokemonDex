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
  let order = [...state.favouritesOrder];
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
      order.splice(action.payload.sourceIndex, 1);
      order.splice(action.payload.destIndex, 0, action.payload.favouriteId);
      return {
        ...state,
        favouritesOrder: order,
      };
    case FAVOURITES.COMMIT_REORDER: //also works for removals
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
      order.splice(action.payload, 1);
      return {
        ...state,
        favouritesOrder: order,
      };
    default:
      return state;
  }
};

export default favouritesReducer;
