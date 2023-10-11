import { LOGIN_USER, LOGOUT } from "../type";

export const loginAction = (data) => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};
export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
