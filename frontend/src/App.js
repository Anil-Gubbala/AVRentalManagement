import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import Home from "./views/Home";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Signout from "./views/Signout";
import AddCar from "./views/AddCar";
import InvalidPage from "./views/InvalidPage";
import AdminHome from "./views/AdminHome";
import CarOwnerHome from "./views/CarOwnerHome";
import { HomeAdmin } from "./views/AdminLanding";
import UserProfile from "./views/UserProfile";
import RideHistory from "./views/RideHistory";
import RideDetails from "./views/RideDetails";
import TrackRide from "./views/TrackRide";
import CarRideHistory from "./views/CarRideHistory";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Routes>
          <Route path="/home-admin" exact element={<HomeAdmin />}></Route>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/adminhome" exact element={<AdminHome />}></Route>
          <Route path="/carownerhome" exact element={<CarOwnerHome />}></Route>
          <Route path="/signin" exact element={<Signin />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/signout" exact element={<Signout />}></Route>
          <Route path="/addcar" exact element={<AddCar />}></Route>
          <Route path="/userProfile" exact element={<UserProfile />}></Route>
          <Route path="/ridehistory" exact element={<RideHistory />}></Route>
          <Route path="/ridedetails" exact element={<RideDetails />}></Route>
          <Route path="/trackRide" exact element={<TrackRide />}></Route>
          <Route
            path="/carridehistory"
            exact
            element={<CarRideHistory />}
          ></Route>
          <Route path="*" element={<InvalidPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
