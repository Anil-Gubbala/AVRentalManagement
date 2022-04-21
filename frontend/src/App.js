import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Navigator from "./components/Navigator";
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/signin" exact>
            <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/signout" exact>
            <Signout />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
