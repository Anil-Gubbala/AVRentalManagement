import { REDUCER } from "./consts";

export const getRole = () => localStorage.getItem(REDUCER.ROLE);

export const isAdmin = () => {
  if (isSignedIn() && getRole() === "2") {
    return true;
  }
  return false;
};

export const isUser = () => {
  if (isSignedIn() && getRole() === "0") {
    return true;
  }
  return false;
};

export const isCarOwner = () => {
  if (isSignedIn() && getRole() === "2") {
    return true;
  }
  return false;
};

export const isSignedIn = () =>
  JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
