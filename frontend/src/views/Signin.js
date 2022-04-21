import React, { useState, Component } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import classnames from "classnames";
import Axios from "axios";
import cookie from "react-cookies";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { post } from "../utils/serverCall";
import { actionCreators } from "../reducers/actionCreators";
import { REDUCER } from "../utils/consts";

function Signin() {
  const [emailid, setEmailId] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [isCustomer, setIsCustomer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [failMsg, setFailMsg] = useState("");

  const dispatch = useDispatch();
  const { adminLogin, customerLogin } = bindActionCreators(
    actionCreators,
    dispatch
  );

  Axios.defaults.withCredentials = true;
  const login = (event) => {
    event.preventDefault();
    const data = {
      emailid,
      password,
    };
    post("/signinData", data)
      .then((response) => {
        localStorage.setItem(REDUCER.TOKEN, response.token)
        localStorage.setItem(REDUCER.SIGNEDIN, true);
        if (response.user.isAdmin) {
          localStorage.setItem(REDUCER.ISADMIN, true);
          adminLogin();
          setIsAdmin(true);
        } else {
          localStorage.setItem(REDUCER.ISADMIN, false);
          customerLogin();
          setIsCustomer(true);
        }
      })
      .catch(() => {});
    // try {
    //   await post(`${backendServer}/signinData`, data).then((response) => {
    //     if (response.status === 200) {
    //       localStorage.setItem(REDUCER.SIGNEDIN, true);
    //       customerLogin();
    //       setLoginStatus(true);
    //     } else {
    //       console.log('error in serverside');
    //     }
    //   });
    // } catch (error) {
    //   setLoginStatus(false);
    // }
  };

  if (isCustomer) {
    return <Redirect to="/home" />;
  }
  if (isAdmin) {
    return <Redirect to="/adminHome" />;
  }

  return (
    <form className="flight-book-form">
      <div className="login-form-box">
        <div className="login-form" style={{ color: "white" }}>
          <h2 className="heading-section text-center">Sign In</h2>
          <h3 className="mb-4 text-center">Have an account?</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => {
              setEmailId(e.target.value);
            }}
          />
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit" className="form-control" onClick={login}>
            <h4>Sign In</h4>
          </button>
          <br />
          <p className="w-100 text-center">
            &mdash; Haven't registered yet &mdash;
          </p>
          <a href="Signup">
            <h4 style={{ color: "white", textAlign: "center" }}>SignUp</h4>
          </a>
        </div>
      </div>
    </form>
  );
}

export default Signin;
