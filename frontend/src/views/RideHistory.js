import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";

import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { post, get } from "../utils/serverCall";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";

const RideHistory = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCar, setRedirToCar] = useState(false);
  const [userRideDetails, setuserRideDetails] = useState([]);

  const [selectedRide, setSelectedRide] = useState("");
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  const downloadData = () => {
    const pdf = new jsPDF("portrait", "px", "a4", "false");

    pdf.text(30, 110, "Name");

    pdf.autoTable({ html: "#table" });
    pdf.save("data.pdf");
  };

  const getUserRides = () => {
    get(`/getuserrides`)
      .then((response) => {
        console.log(response);
        setuserRideDetails(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserRides();
  }, []);

  const viewRideDetails = (e) => {
    setSelectedRide(e.target.getAttribute("data"));
    setRedirectToDetails(true);
  };

  // if (role !== "0") {
  //   return <Navigate to={redirectHome()} />;
  // }

  if (redirectToDetails) {
    return <Navigate to={"/ridedetails?id=" + selectedRide} />;
  }

  return (
    <div>
      <Container>
        <h2 className="mb-4 text-center">Ride History</h2>
      </Container>

      <Container>
        <Table striped bordered hover id="table">
          <thead style={{ background: "#000000", color: "white" }}>
            <tr>
              <th>Ride ID</th>
              <th>Date</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Car Reg Number</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {userRideDetails.map((ride) => {
              return (
                <tr key={ride.id}>
                  <td>{ride.id}</td>
                  <td>{ride.startTime}</td>
                  <td>{ride.source}</td>
                  <td>{ride.destination}</td>
                  <td>{ride.carId}</td>
                  <td>
                    <div
                      style={{
                        background:
                          ride.status == "0" ? "#9fd5a5" : "rgb(212 100 121)",
                        borderRadius: "15px",
                        textAlign: "center",
                        display: "inherit",
                        padding: "10px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                    ></div>
                  </td>
                  <td>
                    <Button
                      data={ride.id}
                      variant="dark"
                      onClick={viewRideDetails}
                    >
                      View Ride
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default RideHistory;
