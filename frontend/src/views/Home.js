import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { get } from "../utils/serverCall";

function Home() {
  const role = localStorage.getItem(REDUCER.ROLE);
  const defaultValues = {
    source: "-1",
    destination: "-1",
  };
  const [rideDetails, setRideDetails] = useState(defaultValues);
  const checkAvailability = () => {
    get(`/checkAvailability`, { rideDetails })
      .then((response) => {
        //display list of vehicles from db
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (role !== "0") {
    return <Navigate to={redirectHome()} />;
  }
  return (
    <div>
      <Form style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="row">
          <Form.Group className="col">
            <FloatingLabel label="Source">
              <Form.Control
                as="select"
                default="-1"
                onChange={(e) => {
                  setRideDetails({ ...rideDetails, source: e.target.value });
                }}
              >
                <option value="-1">Select Source</option>
                <option value="0">San Jose</option>
                <option value="1">Santa Clara</option>
              </Form.Control>
            </FloatingLabel>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col">
            <FloatingLabel label="Destination">
              <Form.Control
                as="select"
                onChange={(e) => {
                  setRideDetails({
                    ...rideDetails,
                    destination: e.target.value,
                  });
                }}
              >
                <option value="-1">Select Destination</option>
                <option value="0">San Jose</option>
                <option value="1">Santa Clara</option>
              </Form.Control>
            </FloatingLabel>
          </Form.Group>
        </div>
        <br />

        <div>
          <Button type="submit" onClick={checkAvailability} variant="dark">
            Check Availability
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Home;
