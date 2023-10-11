import { UPDATE_BASKET } from "../type";

const INITIAL_STATE = [];

export const basketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_BASKET:
      return action.payload;
    default:
      return state;
  }
};
