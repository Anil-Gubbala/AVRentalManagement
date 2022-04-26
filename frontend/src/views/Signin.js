import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { get, post } from "../utils/serverCall";
import { actionCreators } from "../reducers/actionCreators";
import { REDUCER } from "../utils/consts";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import carLogin from "./../images/carLogin.jpeg";

function Signin() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("0");
  const [isCustomer, setIsCustomer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCarOwner, setIsCarOwner] = useState(false);

  const dispatch = useDispatch();
  const { adminLogin, customerLogin, carOwnerLogin } = bindActionCreators(
    actionCreators,
    dispatch
  );

  Axios.defaults.withCredentials = true;
  const login = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
      role,
    };
    get("/signin", data)
      .then((response) => {
        localStorage.setItem(REDUCER.TOKEN, response.token);
        localStorage.setItem(REDUCER.SIGNEDIN, true);
        localStorage.setItem(REDUCER.ROLE, response.user.role);
        if (response.user.role === "0") {
          adminLogin();
          setIsCustomer(true);
        } else if (response.user.role === "1") {
          adminLogin();
          setIsCarOwner(true);
        } else {
          customerLogin();
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  };

  if (isCustomer) {
    return <Navigate to="/home" />;
  }
  if (isAdmin) {
    return <Navigate to="/home-admin" />;
  }
  if (isCarOwner) {
    return <Navigate to="/carOwnerHome" />;
  }

  return (
    <>
      <div
        style={{
          background: "linear-gradient(90deg, #FFFFFF 70%, #0A2FB6 30%)",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <div className="col-md-5">
            <div
              style={{
                fontFamily: "unset",
                fontSize: "45px",
                fontWeight: "300",
              }}
            >
              AV Cloud
            </div>
            <div style={{ width: "75%" }}>
              <form className="flight-book-form">
                <div className="login-form-box">
                  <div className="login-form">
                    <div
                      style={{
                        marginBottom: "30px",
                        marginTop: "20px",
                        fontSize: "25px",
                      }}
                    >
                      Login to the account
                    </div>
                    <Form.Group className="col">
                      <FloatingLabel label="Email Address">
                        <Form.Control
                          required
                          id="register-email-id"
                          label="Email ID"
                          type="text"
                          onChange={(e) => {
                            setemail(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="col">
                      <FloatingLabel label="Password">
                        <Form.Control
                          required
                          id="register-password"
                          label="Password"
                          type="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group className="col">
                      <FloatingLabel label="Role">
                        <Form.Control
                          as="select"
                          default="0"
                          onChange={(e) => {
                            setRole(e.target.value);
                          }}
                        >
                          <option value="0" defaultChecked>
                            Customer
                          </option>
                          <option value="1">Car Owner</option>
                          <option value="2">Admin</option>
                        </Form.Control>
                      </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Button
                      type="submit"
                      onClick={login}
                      style={{
                        marginBottom: "8px",
                        padding: "10px",
                        width: "100%",
                        background: "#0A2FB6",
                      }}
                    >
                      Login
                    </Button>
                    <br />
                    <p className="w-100 text-center">
                      &mdash; Haven't registered yet &mdash;
                    </p>
                    <Link
                      to="/signup"
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        display: "block",
                      }}
                    >
                      Go to Sign up page
                    </Link>
                    {/* <a href="Signup">
                      <h4 style={{ textAlign: "center" }}>SignUp</h4>
                    </a> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-5">
            <img
              src={carLogin}
              style={{
                width: "800px",
                height: "500px",
                marginTop: "20px",
                borderRadius: "15px",
                position: "relative",
              }}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
