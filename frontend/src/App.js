import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import Home from "./views/Home";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Signout from "./views/signout";
import AddCar from "./views/AddCar";
import InvalidPage from "./views/InvalidPage";
import AdminHome from "./views/AdminHome";
import CarOwnerHome from "./views/CarOwnerHome";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Routes>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/adminhome" exact element={<AdminHome />}></Route>
          <Route path="/carownerhome" exact element={<CarOwnerHome />}></Route>
          <Route path="/signin" exact element={<Signin />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/signout" exact element={<Signout />}></Route>
          <Route path="/addcar" exact element={<AddCar />}></Route>
          <Route path="*" element={<InvalidPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
