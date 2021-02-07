import pick from "lodash/pick";

import { FAVOURITES, META } from "../actions/types";

const favouritesInitialState = {
  favourites: [],
  favouritesOrder: [],
};

const favouritesReducer = (state = favouritesInitialState, action) => {
  if (!state.hydrated) {
    state.favouritesOrder = state.favourites.map(({ id }) => id);
    state = { ...favouritesInitialState, ...state, hydrated: true };
  }

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
      const reorderedFavourites = state.favouritesOrder.map((favId) => ({
        ...(state.favourites.find(({ id }) => id === favId) || {}),
      }));
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
      const removeIndex = state.favouritesOrder.indexOf(action.payload);
      order.splice(removeIndex, 1);
      return {
        ...state,
        favouritesOrder: order,
      };
    case META.IMPORT:
      return {
        ...state,
        ...pick(action.payload.favourites, ["favourites", "favouritesOrder"]),
      };
    case META.RESET:
      return {
        ...favouritesInitialState,
      };
    default:
      return state;
  }
};

export default favouritesReducer;
