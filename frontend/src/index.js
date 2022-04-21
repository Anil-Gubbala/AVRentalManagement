import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import App from "./App";
import store from "./reducers/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
