import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { REDUCER } from "../utils/consts";
import { get } from "../utils/serverCall";
import { post } from "../utils/serverCall";

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

  if (!isSignedIn) {
    // redirec page here
  }

  const getUserDetails = () => {
    get(`/getProfile`)
      .then((response) => {
        setUserDetails(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProfile = () => {
    post("/updateProfile");
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Form style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="row">
          <Form.Group className="col">
            <Form.Label>First Name</Form.Label>
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
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>Last Name</Form.Label>
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
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col">
            <Form.Label>Phone Number</Form.Label>
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
            value={userDetails.address}
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
              value={userDetails.city}
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
              value={userDetails.state}
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
              value={userDetails.country}
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
            />
          </Form.Group>

          <Form.Group className="col">
            <Form.Label>Gender</Form.Label>
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
          </Form.Group>
        </div>
        <br />

        <div>
          <Button type="submit" onClick={updateProfile} variant="dark">
            Update Profile
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserProfile;
