import { UPDATE_BASKET } from "../type";

export const basketAction = (data) => {
  return {
    type: UPDATE_BASKET,
    payload: data,
  };
};
