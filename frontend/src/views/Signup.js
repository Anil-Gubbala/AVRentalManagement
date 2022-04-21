import { useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import classnames from "classnames";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { post } from "../utils/serverCall";

function Signup() {
  Axios.defaults.withCredentials = true;
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState({
    // user_id: false,
    password: false,
    customer_first_name: false,
    customer_last_name: false,
    emailid: false,
    address: false,
    city: false,
    state: false,
    country: false,
    zip_code: false,
    passportid: false,
    gender: false,
    sec_ques: false,
    sec_ans: false,
    role: false,
  });
  const defaultValues = {
    password: "",
    customer_first_name: "",
    customer_last_name: "",
    emailid: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    passportid: "",
    gender: "Male",
    sec_ques: "What is your mother's maiden name?",
    sec_ans: "",
    role: "customer",
  };

  const [userDetails, setUserDetails] = useState(defaultValues);
  const history = useHistory();
  const register = (event) => {
    event.preventDefault();

    if (
      userDetails.password.trim().length < 5 ||
      userDetails.customer_first_name.trim() === "" ||
      userDetails.customer_last_name.trim() === "" ||
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
      console.log("Entered");
      alert("Space character not allowed in zip_code, password, email_id");
      setMessage("Space character not allowed in zip_code, password, email_id");
    } else {
      console.log("Entered");
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
    <form className="flight-book-form">
      <div className="login-form" style={{ color: "white" }}>
        <Container>
          <h2 className="mb-4 text-center">Fill your details</h2>
          <Form>
            <div className="row">
              <Form.Group className="col">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  helpertext={
                    invalid.customer_first_name ? "1-25 characters" : ""
                  }
                  id="register-first-name"
                  label="First Name"
                  error={invalid.first_name}
                  onChange={(e) => {
                    const validation = !!(
                      e.target.value.length > 25 || e.target.value === ""
                    );
                    setInvalid({ ...invalid, customer_first_name: validation });
                    setUserDetails({
                      ...userDetails,
                      customer_first_name: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  helpertext={
                    invalid.customer_last_name ? "1-25 characters" : ""
                  }
                  id="register-last-name"
                  label="Last Name"
                  type="text"
                  error={invalid.customer_last_name}
                  onChange={(e) => {
                    const validation = !!(
                      e.target.value.length > 25 || e.target.value === ""
                    );
                    setInvalid({ ...invalid, customer_last_name: validation });
                    setUserDetails({
                      ...userDetails,
                      customer_last_name: e.target.value,
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
                  error={invalid.email_id}
                  onChange={(e) => {
                    const validation = !!(
                      e.target.value.length > 25 || e.target.value === ""
                    );
                    setInvalid({ ...invalid, emailid: validation });
                    setUserDetails({ ...userDetails, emailid: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label>password</Form.Label>
                <Form.Control
                  required
                  helpertext="Minimum 5 & Maximum 25 characters"
                  id="register-password"
                  label="Password"
                  type="password"
                  error={invalid.password}
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
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                helpertext={invalid.address ? "1-25 characters" : ""}
                id="register-street"
                label="Street"
                type="text"
                error={invalid.street}
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
                  error={invalid.city}
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
                  error={invalid.state}
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
                  error={invalid.country}
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
                  error={invalid.zip_code}
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
                <Form.Label>Passport ID</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      passportid: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  default="Male"
                  value={userDetails?.gender}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, gender: e.target.value });
                  }}
                >
                  <option value="Male" defaultChecked>
                    Male
                  </option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col">
                <Form.Label>Security Question 1</Form.Label>
                <Form.Control
                  as="select"
                  default="What is your mother's maiden name?"
                  value={userDetails?.sec_ques}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      sec_ques: e.target.value,
                    });
                  }}
                >
                  <option value="What is your mother's maiden name?">
                    What is your mother's maiden name?
                  </option>
                  <option value="What was the name of your first pet?">
                    What was the name of your first pet?
                  </option>
                  <option value="What was the name of your first school?">
                    What was the name of your first school?
                  </option>
                </Form.Control>
                <Form.Control
                  type="text"
                  placeholder="Answer:"
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, sec_ans: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  default="Customer"
                  value={userDetails?.role}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, role: e.target.value });
                  }}
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin </option>
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
    </form>
  );
}

export default Signup;
