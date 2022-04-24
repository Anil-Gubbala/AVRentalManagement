import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { Form, Button } from "react-bootstrap";
import { post } from "../utils/serverCall";
import carLogin from "./../images/carLogin.jpeg";

function Signup() {
  Axios.defaults.withCredentials = true;
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState({
    password: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    state: false,
    country: false,
    zipcode: false,
    gender: false,
    role: false,
  });
  const defaultValues = {
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
    gender: "0",
    role: "0",
  };

  const [userDetails, setUserDetails] = useState(defaultValues);

  const register = (event) => {
    event.preventDefault();

    if (
      userDetails.password.trim().length < 5 ||
      userDetails.firstName.trim() === "" ||
      userDetails.lastName.trim() === "" ||
      userDetails.city.trim() === "" ||
      userDetails.address.trim() === "" ||
      userDetails.email.trim() === "" ||
      userDetails.zipcode.length < 5
    ) {
      alert("Please fill all fields");
      setMessage("Please fill all fields");
    } else if (
      userDetails.email.includes(" ") ||
      userDetails.zipcode.includes(" ") ||
      userDetails.password.includes(" ")
    ) {
      alert("Space character not allowed in zipcode, password, email_id");
      setMessage("Space character not allowed in zipcode, password, email_id");
    } else {
      post(`/register`, {
        userDetails,
      })
        .then((response) => {
          console.log(response);
          setMessage(`Registration Successful`);
          setRegisterd(true);
        })
        .catch((error) => {
          setMessage(error.response.err);
          setRegisterd(false);
        });
    }
  };

  if (registered) {
    return (
      <form className="flight-book-form">
        <div className="main">
          <h1 style={{ textAlign: "center" }}> {message}</h1>
          <br />
          <Link to="/signin" style={{ fontSize: 35, textAlign: "center" }}>
            <h1>Go to Login Page</h1>
          </Link>
        </div>
      </form>
    );
  }

  return (
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
            <div
              style={{
                marginBottom: "30px",
                marginTop: "20px",
                fontSize: "25px",
              }}
            >
              Register an account
            </div>

            <Form style={{ maxWidth: "600px", margin: "auto" }}>
              <div className="row" style={{ marginBottom: "20px" }}>
                <Form.Group className="col">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    helpertext={invalid.firstName ? "1-25 characters" : ""}
                    id="register-first-name"
                    label="First Name"
                    isInvalid={invalid.first_name}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length > 25 || e.target.value === ""
                      );
                      setInvalid({ ...invalid, firstName: validation });
                      setUserDetails({
                        ...userDetails,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="col">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    helpertext={invalid.lastName ? "1-25 characters" : ""}
                    id="register-last-name"
                    label="Last Name"
                    type="text"
                    isInvalid={invalid.lastName}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length > 25 || e.target.value === ""
                      );
                      setInvalid({ ...invalid, lastName: validation });
                      setUserDetails({
                        ...userDetails,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="col">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    helpertext="Minimum 5 & Maximum 25 characters"
                    id="register-password"
                    label="Password"
                    type="password"
                    isInvalid={invalid.password}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length < 5 ||
                        e.target.value.length > 25 ||
                        e.target.value === ""
                      );
                      setInvalid({ ...invalid, password: validation });
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </div>
              <div className="row" style={{ marginBottom: "20px" }}>
                <Form.Group className="col">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    helpertext={invalid.email ? "1-25 characters" : ""}
                    id="register-email-id"
                    label="Email ID"
                    type="text"
                    isInvalid={invalid.email}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length > 25 ||
                        e.target.value === "" ||
                        e.target.value.includes(" ") ||
                        e.target.value.indexOf("@") === -1
                      );
                      setInvalid({ ...invalid, email: validation });
                      setUserDetails({ ...userDetails, email: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group className="col">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    id="register-phone"
                    type="number"
                    isInvalid={invalid.phone}
                    onChange={(e) => {
                      const validation = e.target.value.length !== 10;
                      setInvalid({ ...invalid, phone: validation });
                      setUserDetails({
                        ...userDetails,
                        phone: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </div>
              <div className="row" style={{ marginBottom: "20px" }}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    helpertext={invalid.address ? "1-25 characters" : ""}
                    id="register-street"
                    label="Street"
                    type="text"
                    isInvalid={invalid.street}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length > 25 || e.target.value === ""
                      );
                      setInvalid({ ...invalid, address: validation });
                      setUserDetails({
                        ...userDetails,
                        address: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </div>

              <div className="row" style={{ marginBottom: "20px" }}>
                <Form.Group className="col">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    helpertext={invalid.city ? "1-25 characters" : ""}
                    id="register-city"
                    label="City"
                    type="text"
                    isInvalid={invalid.city}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length > 25 || e.target.value === ""
                      );
                      setInvalid({ ...invalid, city: validation });
                      setUserDetails({ ...userDetails, city: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group className="col">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    helpertext={invalid.state ? "1-25 characters" : ""}
                    id="register-state"
                    label="state"
                    type="text"
                    isInvalid={invalid.state}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length > 25 || e.target.value === ""
                      );
                      setInvalid({ ...invalid, state: validation });
                      setUserDetails({ ...userDetails, state: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group className="col">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    required
                    helpertext={invalid.country ? "1-25 characters" : ""}
                    id="register-country"
                    label="Country"
                    type="text"
                    isInvalid={invalid.country}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length > 25 || e.target.value === ""
                      );
                      setInvalid({ ...invalid, country: validation });
                      setUserDetails({
                        ...userDetails,
                        country: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </div>
              <div className="row" style={{ marginBottom: "20px" }}>
                <Form.Group className="col">
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    required
                    helpertext="5 digit zip code"
                    id="register-zip-code"
                    label="ZIP Code"
                    type="number"
                    isInvalid={invalid.zipcode}
                    onChange={(e) => {
                      const validation = !!(
                        e.target.value.length !== 5 || e.target.value === ""
                      );
                      setInvalid({ ...invalid, zipcode: validation });
                      setUserDetails({
                        ...userDetails,
                        zipcode: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group className="col">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    default="0"
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="0" defaultChecked>
                      Male
                    </option>
                    <option value="1">Female</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="col">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    default="0"
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, role: e.target.value });
                    }}
                  >
                    <option value="0" defaultChecked>
                      Customer
                    </option>
                    <option value="1">Car Owner</option>
                    <option value="2">Admin</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <br />
              <div>
                <Button
                  type="submit"
                  onClick={register}
                  variant="dark"
                  style={{
                    marginBottom: "8px",
                    padding: "10px",
                  }}
                >
                  Signup
                </Button>
              </div>
            </Form>
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
  );
}

export default Signup;
