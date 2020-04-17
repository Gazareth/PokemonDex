import { FAVOURITES } from "../actions/types";

const favouritesReducer = (state = [], action) => {
  switch (action.type) {
    case FAVOURITES.ADD:
      return [action.payload, ...state];
    case FAVOURITES.REMOVE:
      return [...state].filter(fav => fav.id !== action.payload);
    default:
      return state;
  }
};

export default favouritesReducer;
