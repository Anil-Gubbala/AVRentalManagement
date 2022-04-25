import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { post, get } from "../utils/serverCall";
import Table from "react-bootstrap/Table";
import { Col, Row, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CarRideDetails = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);

  const [rideDetails, setRideDetails] = useState({});
  const [billDetails, setBillDetails] = useState({});

  // if (role !== "0") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  console.log(params.get("id"));

  //   const getRideDetails = () => {
  //     get(`/getRideDetails`, { id: params.get("id") })
  //       .then((response) => {
  //         setRideDetails(response[0]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   const getBillDetails = () => {
  //     get(`/bill`, { id: params.get("id") })
  //       .then((response) => {
  //         setBillDetails(response);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   useEffect(() => {
  //     getRideDetails();
  //     getBillDetails();
  //   }, []);

  const downloadData = () => {
    const pdf = new jsPDF("portrait", "px", "a4", "false");

    pdf.text(30, 110, "Name");

    pdf.autoTable({ html: "#tableCar" });
    pdf.save("invoice.pdf");
  };

  return (
    <div>
      <Container>
        <h2 className="mb-4 text-center">Ride Details</h2>
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

      <Container style={{ marginTop: "32px" }}>
        <Row>
          <Col
            style={{
              boxShadow: "0 0 8px black",
              padding: "25px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Row>
              <h2>Ride Details</h2>
            </Row>
            <Row>
              <Col>
                <h6>Ride ID:</h6>
              </Col>
              <Col>{rideDetails.id}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Origin:</h6>
              </Col>
              <Col>{rideDetails.source}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Destination:</h6>
              </Col>
              <Col>{rideDetails.destination}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Car Reg Number:</h6>
              </Col>
              <Col>{rideDetails.carId}</Col>
            </Row>
          </Col>
          <Col>
            <div>
              <div>
                <h2>Invoice</h2>
              </div>
              <div>
                <Table striped bordered hover id="tableCar">
                  <thead style={{ background: "#000000", color: "white" }}>
                    <tr>
                      <th style={{ width: "60% !important" }}>Charges</th>
                      <th>Payment</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Base Fare</td>

                      <td>{billDetails.card}</td>
                      <td>{billDetails.amount}</td>
                    </tr>
                    <tr>
                      <td>Tax</td>

                      <td>-</td>
                      <td>{billDetails.tax}</td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{ textAlign: "right", fontWeight: "bold" }}
                      >
                        Total Amount
                      </td>

                      <td>{billDetails.total}</td>
                    </tr>
                  </tbody>
                </Table>

                {/* <Table striped bordered hover>
                  <thead style={{ background: "#4B76B6", color: "white" }}>
                    <tr>
                      <th>Amount</th>
                      <th>Tax</th>
                      <th>Card</th>
                      <th>Card</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{billDetails.amount}</td>
                      <td>{billDetails.tax}</td>
                      <td>{billDetails.card}</td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        style={{ textAlign: "right", fontWeight: "bold" }}
                      >
                        Total Amount
                      </td>

                      <td>{billDetails.total}</td>
                    </tr>
                  </tbody>
                </Table> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CarRideDetails;
