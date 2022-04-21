import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { REDUCER } from '../utils/consts';
import { get } from '../utils/serverCall';
import { isAdmin, isSignedIn } from '../utils/checkSignin';

function Navigator() {
  const loginState = useSelector((state) => state.loginReducer);
  const errorState = useSelector((state) => state.errorReducer);

  const [signedIn, setSignedIn] = useState(isSignedIn());
  const [admin, setAdmin] = useState(isAdmin());
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (signedIn) {
      get(`/getLogin`).then((response) => {
        if (response.loggedIn === true) {
        } else {
          setSignedIn(false);
          setAdmin(false);
          localStorage.clear();
        }
      });
    }
  }, []);

  useEffect(() => {
    setSignedIn(isSignedIn());
    setAdmin(isAdmin());
    console.log('entered change login state');
  }, [loginState]);

  const hideAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    if (errorState[REDUCER.ERR_MSG] !== '') {
      setErrorMsg(errorState[REDUCER.ERR_MSG]);
      setShowAlert(true);
      hideAlert();
    }
  }, [errorState]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>MY-AIRLINE</Navbar.Brand>
              {!admin && (
                <Nav className="me-auto">
                  <Link to="/home" className="nav-link">
                    HOME
                  </Link>
                </Nav>
              )}
              {signedIn && admin && (
                <Nav className="me-auto">
                  <Link to="/adminHome" className="nav-link">
                    HOME
                  </Link>
                </Nav>
              )}
              {signedIn && admin && (
                <Nav className="me-auto">
                  <Link to="/adminNewFlight" className="nav-link">
                    Add Flight
                  </Link>
                </Nav>
              )}

              {!signedIn && (
                <Nav>
                  <Link to="/signin" className="nav-link">
                    SIGN IN
                  </Link>
                </Nav>
              )}
              {signedIn && (
                <Nav>
                  <Link to="/userProfile" className="nav-link">
                    PROFILE
                  </Link>
                  <Link to="/signout" className="nav-link">
                    SIGN OUT
                  </Link>
                </Nav>
              )}
            </Container>
          </Navbar>
        </Row>
        {showAlert && (
          <div style={{ position: 'fixed', bottom: '10px', zIndex: '2' }}>
            <Alert variant="danger">{errorMsg}</Alert>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Navigator;
