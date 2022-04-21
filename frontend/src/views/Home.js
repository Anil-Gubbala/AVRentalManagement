import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import flighLogo from "../images/flight.png";
import mytripLogo from "../images/mytrip.png";
import mileageLogo from "../images/mileage.png";
import redirectLogin from "../components/RedirectLogin";
import { REDUCER } from "../utils/consts";
import { clearBooking } from "../reducers/actions";

function Home() {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const isAdmin = JSON.parse(localStorage.getItem(REDUCER.ISADMIN));
  // console.log(userData);
  // if (!userData.email_id) {
  //   return redirectLogin();
  // }
  useEffect(() => {
    dispatch(clearBooking());
  }, []);
  if (isAdmin) {
    return <Redirect to="/adminHome" />;
  }
  return (
    <div className="shoe-container mx-auto">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <img src={flighLogo} alt=" " width="40" height="40" />
                <h5 className="card-title">Book The Flights</h5>
                <Link to="/bookFlight" className="btn btn-secondary btn-lg">
                  Book Flight
                </Link>
              </div>
            </div>
          </div>
          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <img src={mytripLogo} alt=" " width="40" height="40" />
                <h5 className="card-title">View my Bookings</h5>
                <Link to="/myTrips" className="btn btn-secondary btn-lg">
                  My Trips
                </Link>
              </div>
            </div>
          </div>

          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <img src={mileageLogo} alt=" " width="40" height="40" />
                <h5 className="card-title">Manage Mileage Account</h5>
                <Link to="/mileage" className="btn btn-secondary btn-lg">
                  Mileage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
