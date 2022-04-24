import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "~antd/dist/antd.css";

import { Provider } from "react-redux";
import App from "./App";
import store from "./reducers/store";
import axios from "axios";

const backendServer = 'http://localhost:4000';
axios.defaults.baseURL = backendServer

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);