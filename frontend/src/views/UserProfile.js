import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { REDUCER } from "../utils/consts";
import { get, put } from "../utils/serverCall";
import { displayError, displayMessage } from "../utils/messages";

function UserProfile() {
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
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

  if (!isSignedIn) {
    // redirec page here
  }

  const getUserDetails = () => {
    get(`/user`)
      .then((response) => {
        setUserDetails(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProfile = (e) => {
    for (const property in invalid) {
      if (invalid[property]) {
        displayError("Fill valid details");
        return;
      }
    }
    e.preventDefault();
    put("/user", { userDetails }).then(() => {
      displayMessage("Profile details updated");
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-center">Edit Profile</h2>
      <Form style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="row">
          <Form.Group className="col">
            {/* <Form.Label>First Name</Form.Label> */}
            <FloatingLabel label="First Name">
              <Form.Control
                type="text"
                helpertext={invalid.firstName ? "1-25 characters" : ""}
                id="register-first-name"
                label="First Name"
                isInvalid={invalid.first_name}
                value={userDetails.firstName}
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
                value={userDetails.lastName}
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
        </div>
        <div className="row">
          <Form.Group className="col">
            <FloatingLabel label="Phone Number">
              <Form.Control
                required
                id="register-phone"
                type="number"
                isInvalid={invalid.phone}
                value={userDetails.phone}
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
        <Form.Group>
          <FloatingLabel label="Address">
            <Form.Control
              required
              helpertext={invalid.address ? "1-25 characters" : ""}
              id="register-street"
              label="Street"
              type="text"
              isInvalid={invalid.street}
              value={userDetails.address}
              onChange={(e) => {
                const validation = !!(
                  e.target.value.length > 25 || e.target.value === ""
                );
                setInvalid({ ...invalid, address: validation });
                setUserDetails({ ...userDetails, address: e.target.value });
              }}
            />
          </FloatingLabel>
        </Form.Group>
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
                value={userDetails.city}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, city: validation });
                  setUserDetails({ ...userDetails, city: e.target.value });
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
                value={userDetails.state}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, state: validation });
                  setUserDetails({ ...userDetails, state: e.target.value });
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
                value={userDetails.country}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, country: validation });
                  setUserDetails({ ...userDetails, country: e.target.value });
                }}
              />
            </FloatingLabel>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col">
            <FloatingLabel label="Zip code">
              <Form.Control
                required
                helpertext="5 digit zip code"
                id="register-zip-code"
                label="ZIP Code"
                type="number"
                isInvalid={invalid.zipcode}
                value={userDetails.zipcode}
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
              />{" "}
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="col">
            <FloatingLabel label="Gender">
              <Form.Control
                as="select"
                default="0"
                value={userDetails.gender}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, gender: e.target.value });
                }}
              >
                <option value="0" defaultChecked>
                  Male
                </option>
                <option value="1">Female</option>
              </Form.Control>
            </FloatingLabel>
          </Form.Group>
        </div>
        {/* -------------------CARD DETAILS------------------ */}
        {userDetails.role === "0" && (
          <div className="row" style={{ marginBottom: "8px" }}>
            <Form.Group className="col">
              <FloatingLabel label="Name on Card">
                <Form.Control
                  required
                  helpertext={invalid.card ? "1-25 characters" : ""}
                  id="register-cardname"
                  label="Card Name"
                  type="text"
                  value={userDetails.cardName}
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
              <FloatingLabel label="Expiry">
                <Form.Control
                  required
                  id="expiry month"
                  type="month"
                  value={userDetails.expiry}
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
          <div className="row" style={{ marginBottom: "8px" }}>
            <Form.Group className="col">
              <FloatingLabel label="Card Number">
                <Form.Control
                  required
                  id="card-number"
                  type="number"
                  value={userDetails.cardNumber}
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
                  value={userDetails.cvv}
                  isInvalid={invalid.cvv}
                  onChange={(e) => {
                    const validation = !(
                      e.target.value.length === 3 || e.target.value.length === 4
                    );
                    setInvalid({ ...invalid, cvv: validation });
                    setUserDetails({
                      ...userDetails,
                      cvv: e.target.value,
                    });
                  }}
                />{" "}
              </FloatingLabel>
            </Form.Group>
          </div>
        )}
        <br />
        <div>
          <Button type="submit" onClick={updateProfile} variant="dark">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserProfile;
