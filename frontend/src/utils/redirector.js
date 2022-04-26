import { REDUCER } from "./consts";

export const redirectHome = () => {
  const role = localStorage.getItem(REDUCER.ROLE);
  if (role === undefined || role === null) {
    return "/signin";
  }
  if (role === "0") {
    return "/home";
  }
  if (role === "1") {
    return "/carOwnerHome";
  }
  if (role === "2") {
    return "/home-admin";
  }
};
