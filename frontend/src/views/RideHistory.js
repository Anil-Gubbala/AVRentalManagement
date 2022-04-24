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

  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const downloadData = () => {
    const pdf = new jsPDF("portrait", "px", "a4", "false");

    pdf.text(30, 110, "Name");
    // pdf.setFont("Helvetica", "bold");
    // pdf.text(60, 60, "Name");
    // pdf.text(80, 60, "sai teja");

    pdf.autoTable({ html: "#table" });
    pdf.save("data.pdf");
  };

  const getCarDetails = () => {
    get(`/getuserrides`, "ts07et9443")
      .then((response) => {
        console.log(response);
        // setuserRideDetails(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarDetails();
  }, []);

  return (
    <div>
      <Container>
        <h2 className="mb-4 text-center">Ride History</h2>
      </Container>
      <Container>
        <div style={{ textAlign: "right" }}>
          <Button
            type="submit"
            onClick={downloadData}
            style={{
              marginBottom: "8px",
              padding: "10px",
              background: "#000000",
            }}
          >
            Download PDF
          </Button>
        </div>
      </Container>
      <Container>
        <Table striped bordered hover id="table">
          <thead style={{ background: "#000000", color: "white" }}>
            <tr>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userRideDetails.map((ride) => {
              return (
                <>
                  <tr>
                    <td>{ride.customerName}</td>
                    <td>{ride.date}</td>
                    <td>{ride.status}</td>
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
      </Container>
    </div>
  );
};

export default RideHistory;
