import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { get, post } from "../utils/serverCall";
import { displayError } from "../utils/messages";

function Home() {
  const role = localStorage.getItem(REDUCER.ROLE);
  const defaultValues = {
    source: "-1",
    destination: "-1",
  };
  const [rideDetails, setRideDetails] = useState(defaultValues);

  const [availableCars, setAvailableCars] = useState([]);

  const [loadTrackingPage, setLoadTrackingPage] = useState(false);

  const [trackId, setTrackId] = useState("");

  const dummyCars = [
    {
      id: "1",
      model: "Prius",
      brand: "Toyota",
      type: "Economy",
      time: "2",
      fare: "20",
      capacity: 4,
    },
    {
      id: "2",
      model: "Mustang",
      brand: "Ford",
      type: "Premium",
      time: "2",
      fare: "20",
      capacity: 6,
    },
    {
      id: "3",
      model: "Model3",
      brand: "Tesla",
      type: "Ecofriendly",
      time: "2",
      fare: "18",
      capacity: 4,
    },
  ];

  const validate = () => {
    if (rideDetails.source === "-1") {
      displayError("Select valid source");
      return false;
    }
    if (rideDetails.destination === "-1") {
      displayError("Select valid detination");
      return false;
    }
    if (rideDetails.source === rideDetails.destination) {
      displayError("Select different source and destinations");
      return false;
    }
    return true;
  };

  const checkAvailability = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    //temp code
    setAvailableCars(dummyCars);

    // get(`/checkAvailability`, { rideDetails })
    //   .then((response) => {
    //     //display list of vehicles from db
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const bookRide = (e) => {
    // console.log(e.target.getAttribute("carId"));
    const carId = e.target.getAttribute("carId");
    const car = dummyCars.filter((c)=> c.id === carId)[0];

    axios
        .post("startRide", {
           ...rideDetails,
          make: car.brand.toLowerCase(),
          model: car.model.toLowerCase()
        })
        .then((result) => {
          if (result.status == 200) {
            console.log(
                'Successfully started Trip id as ' + result.data,
            )
           setTrackId(result.data.tripId);
            setLoadTrackingPage(true);
          }
        })
        .catch((error) => {
          console.log(error)
          displayError(error)
        })

    // post("/bookRide", {
    //   ...rideDetails,
    //   carId: e.target.getAttribute("carId"),
    // }).then((response) => {
    //   //create booking in db and return the booking ID for tracking
    //   setTrackId(response.bookingId);
    //   setLoadTrackingPage(true);
    // });
  };

  if (role !== "0") {
    return <Navigate to={redirectHome()} />;
  }

  if (loadTrackingPage) {
    return <Navigate to={"/trackRide?id=" + trackId} />;
  }
  return (
    <div>
      <div className="row">
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
                  <option value="San Jose">San Jose</option>
                  <option value="Santa Clara">Santa Clara</option>
                  <option value="Sacramento">Sacramento</option>
                  <option value="San Francisco">San Francisco</option>
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
                  <option value="San Jose">San Jose</option>
                  <option value="Santa Clara">Santa Clara</option>
                  <option value="Sacramento">Sacramento</option>
                  <option value="San Francisco">San Francisco</option>
                </Form.Control>
              </FloatingLabel>
            </Form.Group>
          </div>
          <br />

          <div>
            <Button
              type="submit"
              onClick={checkAvailability}
              variant="dark"
              style={{ marginBottom: "8px" }}
            >
              Check Availability
            </Button>
          </div>
        </Form>
      </div>
      <div className="row">
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ margin: "auto", maxWidth: "800px" }}
        >
          <thead>
            <tr>
              <th>Model</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Arrival Time</th>
              <th>Fare</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {availableCars.map((each) => {
              return (
                <tr key={each.id}>
                  <td>{each.model}</td>
                  <td>{each.type}</td>
                  <td>{each.capacity}</td>
                  <td>{each.time}</td>
                  <td>{each.fare}</td>
                  <td>
                    <Button carId={each.id} variant="dark" onClick={bookRide}>
                      Book Ride
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
