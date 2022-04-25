import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { post, get } from "../utils/serverCall";

import { Button, FloatingLabel, Form, Table } from "react-bootstrap";

const CarRideHistory = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCarHome, setRedirToCarHome] = useState(false);
  const [carRideDetails, setCarRideDetails] = useState([]);

  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const getCarDetails = () => {
    get(`/getCarRides`, "ts07et9443")
      .then((response) => {
        console.log(response);
        // setCarRideDetails(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarDetails();
  }, []);

  const Back = (event) => {
    event.preventDefault();
    setRedirToCarHome(true);
  };

  let ad = null;
  if (redirToCarHome) ad = <Navigate to="/carownerhome" />;
  return (
    <div>
      {ad}

      <Container>
        <h2 className="mb-4 text-center">Car Ride History</h2>
        <div style={{ margin: "20px", textAlign: "right" }}>
          <Button
            type="submit"
            onClick={Back}
            variant="dark"
            style={{ marginBottom: "8px", marginLeft: "20px" }}
          >
            Go Back
          </Button>
        </div>
      </Container>
      <Container>
        <Table striped bordered hover>
          <thead style={{ background: "#000000", color: "white" }}>
            <tr>
              <th>Origin</th>
              <th>Destination</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {carRideDetails.map((ride) => {
              return (
                <>
                  <tr>
                    <td>{ride.origin}</td>
                    <td>{ride.destination}</td>
                    <td>{ride.customerName}</td>
                    <td>{ride.date}</td>
                    <td>{ride.fare}</td>
                    <td>
                      <div
                        style={{
                          background:
                            ride.status == "Normal"
                              ? "#9fd5a5"
                              : "rgb(212 100 121)",
                          borderRadius: "15px",
                          textAlign: "center",
                          display: "inherit",
                          padding: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}
                      ></div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        {carRideDetails.length === 0 && <h2> No rides booked. </h2>}
      </Container>
    </div>
  );
};

export default CarRideHistory;