import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import errorReducer from "./errorReducer";

const reducers = combineReducers({ loginReducer, errorReducer });

export default reducers;
