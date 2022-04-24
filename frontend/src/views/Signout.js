import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducers/actionCreators";
import { get } from "../utils/serverCall";
import { REDUCER } from "../utils/consts";

const Signout = () => {
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreators, dispatch);
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));

  Axios.defaults.withCredentials = true;
  const [loggedOut, setLoggedout] = useState(false);
  useEffect(() => {
    isSignedIn &&
      get(`/signout`).then((response) => {
        localStorage.clear();
        logout();
        setLoggedout(true);
      });
  }, []);
  if (loggedOut) {
    return (
      <>
        <form className="flight-book-form">
          <div style={{ margin: "auto", width: "fit-content" }}>
            <h1>Successfully logged out</h1>
            <Link to="/signin" style={{ fontSize: 35, textAlign: "center" }}>
              Go to Login page
            </Link>
          </div>
        </form>
      </>
    );
  }
  return (
    <div style={{ margin: "auto", width: "fit-content" }}>
      <Link to="/signin" style={{ fontSize: 35, textAlign: "center" }}>
        Go to Login page
      </Link>
    </div>
  );
};

export default Signout;
