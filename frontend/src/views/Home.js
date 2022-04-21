import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import redirectLogin from "../components/RedirectLogin";
import { REDUCER } from "../utils/consts";

function Home() {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const isAdmin = JSON.parse(localStorage.getItem(REDUCER.ISADMIN));

  if (isAdmin) {
    return <Navigate to="/adminHome" />;
  }
  return <div> "Home page here"</div>;
}

export default Home;
