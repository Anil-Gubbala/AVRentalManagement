import { REDUCER } from './consts';

export const isAdmin = () => JSON.parse(localStorage.getItem(REDUCER.ISADMIN));

export const isSignedIn = () => JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
