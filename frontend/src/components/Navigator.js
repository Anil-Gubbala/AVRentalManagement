import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { REDUCER } from "../utils/consts";
import { get } from "../utils/serverCall";
import { getRole, isSignedIn } from "../utils/checkSignin";
import { redirectHome } from "../utils/redirector";

function Navigator() {
  const loginState = useSelector((state) => state.loginReducer);
  const errorState = useSelector((state) => state.errorReducer);
  const messageState = useSelector((state) => state.messageReducer);

  const [signedIn, setSignedIn] = useState(isSignedIn());
  const [role, setRole] = useState("0");
  // const [admin, setAdmin] = useState(isAdmin());
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (signedIn) {
      get(`/getLogin`).then((response) => {
        if (response.loggedIn === true) {
          setRole(getRole());
        } else {
          setSignedIn(false);
          localStorage.clear();
        }
      });
    }
  }, []);

  useEffect(() => {
    setSignedIn(isSignedIn());
    setRole(getRole());
    // console.log("entered change login state");
  }, [loginState]);

  const hideError = () => {
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const hideMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  useEffect(() => {
    if (errorState[REDUCER.ERR_MSG] !== "") {
      setErrorMsg(errorState[REDUCER.ERR_MSG]);
      setShowError(true);
      hideError();
    }
  }, [errorState]);

  useEffect(() => {
    if (messageState[REDUCER.MESSAGE] !== "") {
      setMessage(messageState[REDUCER.MESSAGE]);
      setShowMessage(true);
      hideMessage();
    }
  }, [messageState]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Group13</Navbar.Brand>
              {/* {!admin && (
                <Nav className="me-auto">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </Nav>
              )}

              {signedIn && admin && (
                <Nav className="me-auto">
                  <Link to="/adminHome" className="nav-link">
                    Home
                  </Link>
                </Nav>
              )} */}

              <Nav className="me-auto">
                <Link to={redirectHome()} className="nav-link">
                  Home
                </Link>
              </Nav>

              {!signedIn && (
                <Nav>
                  <Link to="/signin" className="nav-link">
                    Sign In
                  </Link>
                </Nav>
              )}

              {signedIn && role === "0" && (
                <Nav>
                  <Link to="/ridehistory" className="nav-link">
                    My Bookings
                  </Link>
                </Nav>
              )}

              {signedIn && (
                <Nav>
                  <Link to="/userProfile" className="nav-link">
                    Profile
                  </Link>
                  <Link to="/signout" className="nav-link">
                    Sign Out
                  </Link>
                </Nav>
              )}
            </Container>
          </Navbar>
        </Row>
        {showError && (
          <div style={{ position: "fixed", bottom: "10px", zIndex: "2" }}>
            <Alert variant="danger" dismissible="true">
              {errorMsg}
            </Alert>
          </div>
        )}
        {showMessage && (
          <div style={{ position: "fixed", bottom: "10px", zIndex: "2" }}>
            <Alert variant="success" dismissible="true">
              {message}
            </Alert>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Navigator;
