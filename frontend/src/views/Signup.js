import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

import { post } from "../utils/serverCall";

function Signup() {
  Axios.defaults.withCredentials = true;
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState({
    password: false,
    firstName: false,
    lastName: false,
    emailid: false,
    phone: false,
    address: false,
    city: false,
    state: false,
    country: false,
    zip_code: false,
    gender: false,
    role: false,
  });
  const defaultValues = {
    password: "",
    firstName: "",
    lastName: "",
    emailid: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
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
      userDetails.emailid.trim() === "" ||
      userDetails.zip_code.length < 5
    ) {
      alert("Please fill all fields");
      setMessage("Please fill all fields");
    } else if (
      userDetails.emailid.includes(" ") ||
      userDetails.zip_code.includes(" ") ||
      userDetails.password.includes(" ")
    ) {
      alert("Space character not allowed in zip_code, password, email_id");
      setMessage("Space character not allowed in zip_code, password, email_id");
    } else {
      post(`/register`, {
        userDetails,
      })
        .then((response) => {
          console.log(response);
          setMessage(
            `Your User ID is "${response.emailid}" \n Mileage account: "${response.mileage_number}"`
          );
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
    <div>
      <Container>
        <h2 className="mb-4 text-center">Account Registration</h2>
        <Form>
          <div className="row">
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
          <div className="row">
            <Form.Group className="col">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                helpertext={invalid.emailid ? "1-25 characters" : ""}
                id="register-email-id"
                label="Email ID"
                type="text"
                isInvalid={invalid.emailid}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 ||
                    e.target.value === "" ||
                    e.target.value.includes(" ") ||
                    e.target.value.indexOf("@") === -1
                  );
                  setInvalid({ ...invalid, emailid: validation });
                  setUserDetails({ ...userDetails, emailid: e.target.value });
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
                setUserDetails({ ...userDetails, address: e.target.value });
              }}
            />
          </Form.Group>
          <div className="row">
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
                  setUserDetails({ ...userDetails, country: e.target.value });
                }}
              />
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="col">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                required
                helpertext="5 digit zip code"
                id="register-zip-code"
                label="ZIP Code"
                type="number"
                isInvalid={invalid.zip_code}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length !== 5 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, zip_code: validation });
                  setUserDetails({
                    ...userDetails,
                    zip_code: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="col">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                default="0"
                value={userDetails?.gender}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, gender: e.target.value });
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
                value={userDetails?.role}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, role: e.target.value });
                }}
              >
                <option value="0" defaultChecked>
                  Customer
                </option>
                <option value="1">Car Owner</option>
              </Form.Control>
            </Form.Group>
          </div>
          <br />
          <div>
            <button type="submit" onClick={register}>
              <h4>Signup</h4>
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Signup;
