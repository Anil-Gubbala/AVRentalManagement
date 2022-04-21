import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import Home from "./views/Home";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Signout from "./views/signout";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Routes>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/signin" exact element={<Signin />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/signout" exact element={<Signout />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
