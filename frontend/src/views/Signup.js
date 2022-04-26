import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { post } from "../utils/serverCall";
import carLogin from "./../images/carLogin.jpeg";
import { displayError, displayMessage } from "../utils/messages";

function Signup() {
  Axios.defaults.withCredentials = true;
  const [registered, setRegisterd] = useState(false);

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
    cardName: false,
    cardNumber: false,
    expiry: false,
    cvv: false,
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
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
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
      displayError("Please fill all fields");
    } else if (
      userDetails.email.includes(" ") ||
      userDetails.zipcode.includes(" ") ||
      userDetails.password.includes(" ")
    ) {
      alert("Space character not allowed in zipcode, password, email_id");
      displayError(
        "Space character not allowed in zipcode, password, email_id"
      );
    } else {
      for (const property in invalid) {
        if (invalid[property]) {
          displayError("Fill valid details");
          return;
        }
      }
      if (userDetails.role === "0") {
        if (
          userDetails.cardName === "" ||
          userDetails.cardNumber === "" ||
          userDetails.expiry === "" ||
          userDetails.cvv === ""
        ) {
          displayError("Fill valid card details");
          return;
        }
      }
      post(`/user`, {
        userDetails,
      })
        .then((response) => {
          console.log(response);
          displayMessage(`Registration Successful`);
          setRegisterd(true);
        })
        .catch((error) => {
          displayError(error.response.err);
          setRegisterd(false);
        });
    }
  };

  if (registered) {
    return (
      <>
        <form>
          <div style={{ margin: "auto", width: "fit-content" }}>
            <h1>Registration Successfull</h1>
            <Link to="/signin" style={{ fontSize: 35, textAlign: "center" }}>
              Go to Login page
            </Link>
          </div>
        </form>
      </>

      // <form className="flight-book-form">
      //   <div className="main">
      //     {/* <h1 style={{ textAlign: "center" }}> {message}</h1> */}
      //     <br />
      //     <Link to="/signin" style={{ fontSize: 35, textAlign: "center" }}>
      //       <h1>Go to Login Page</h1>
      //     </Link>
      //   </div>
      // </form>
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
          {/* <div
            style={{
              fontFamily: "unset",
              fontSize: "45px",
              fontWeight: "300",
            }}
          >
            AV Cloud
          </div> */}
          <div style={{ width: "75%" }}>
            <h2
            // style={{
            //   marginBottom: "8px",
            //   marginTop: "8px",
            //   fontSize: "25px",
            // }}
            >
              Register an account
            </h2>

            <Form style={{ maxWidth: "600px", margin: "auto" }}>
              <div className="row">
                <Form.Group className="col">
                  <FloatingLabel label="First Name">
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
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="col">
                  <FloatingLabel label="Last Name">
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
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="col">
                  <FloatingLabel label="Password">
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
                  </FloatingLabel>
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="col">
                  <FloatingLabel label="Email Address">
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
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="col">
                  <FloatingLabel label="Phone Number">
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
                  </FloatingLabel>
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group>
                  <FloatingLabel label="Address">
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
                  </FloatingLabel>
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group className="col">
                  <FloatingLabel label="City">
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
                        setUserDetails({
                          ...userDetails,
                          city: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="col">
                  <FloatingLabel label="State">
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
                        setUserDetails({
                          ...userDetails,
                          state: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="col">
                  <FloatingLabel label="Country">
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
                  </FloatingLabel>
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="col">
                  <FloatingLabel label="Zipcode">
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
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="col">
                  <FloatingLabel label="Gender">
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
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="col">
                  <FloatingLabel label="Role">
                    <Form.Control
                      as="select"
                      default="0"
                      onChange={(e) => {
                        // if (e.target.value !== "0") {
                        setInvalid({
                          ...invalid,
                          cardName: false,
                          cardNumber: false,
                          cvv: false,
                          expiry: false,
                        });
                        setUserDetails({
                          ...userDetails,
                          cardName: "",
                          cardNumber: "",
                          cvv: "",
                          expiry: "",
                          role: e.target.value,
                        });
                        // }
                        // setUserDetails({
                        //   ...userDetails,
                        //   role: e.target.value,
                        // });
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
              </div>
              {/* -------------------CARD DETAILS------------------ */}
              {userDetails.role === "0" && (
                <div className="row">
                  <Form.Group className="col">
                    <FloatingLabel label="Name on Card">
                      <Form.Control
                        required
                        helpertext={invalid.card ? "1-25 characters" : ""}
                        id="register-cardname"
                        label="Card Name"
                        type="text"
                        isInvalid={invalid.cardName}
                        onChange={(e) => {
                          const validation = !!(
                            e.target.value.length > 25 || e.target.value === ""
                          );
                          setInvalid({ ...invalid, cardName: validation });
                          setUserDetails({
                            ...userDetails,
                            cardName: e.target.value,
                          });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="col">
                    <FloatingLabel label="Expiry Date">
                      <Form.Control
                        required
                        id="expiry month"
                        type="month"
                        isInvalid={invalid.expiry}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            expiry: e.target.value,
                          });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </div>
              )}
              {userDetails.role === "0" && (
                <div className="row">
                  <Form.Group className="col">
                    <FloatingLabel label="Card Number">
                      <Form.Control
                        required
                        id="card-number"
                        type="number"
                        isInvalid={invalid.cardNumber}
                        onChange={(e) => {
                          const validation = e.target.value.length !== 12;
                          setInvalid({ ...invalid, cardNumber: validation });
                          setUserDetails({
                            ...userDetails,
                            cardNumber: e.target.value,
                          });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="col">
                    <FloatingLabel label="CVV">
                      <Form.Control
                        required
                        id="cvv"
                        type="number"
                        isInvalid={invalid.cvv}
                        onChange={(e) => {
                          const validation = !(
                            e.target.value.length === 3 ||
                            e.target.value.length === 4
                          );
                          setInvalid({ ...invalid, cvv: validation });
                          setUserDetails({
                            ...userDetails,
                            cvv: e.target.value,
                          });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </div>
              )}
              <br />
              <div>
                <Button
                  type="submit"
                  onClick={register}
                  style={{
                    marginBottom: "8px",
                    padding: "10px",
                    background: "#0A2FB6",
                    width: "100%",
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
