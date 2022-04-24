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

const RideDetails = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCar, setRedirToCar] = useState(false);

  if (role !== "1") {
    return <Navigate to={redirectHome()} />;
  }

  return (
    <div>
      <Container>
        <h2 className="mb-4 text-center">Details</h2>
      </Container>
      <div style={{ display: "flex", margin: "15px", padding: "10px" }}>
        <div className="col-md-6">
          <div style={{ alignContent: "center" }}>
            <h2>Ride Details</h2>
          </div>
          <div>Customer Name: </div>
          <div>Origin: </div>
          <div>Destination: </div>
          <div>Date: </div>
          <div>Fare: </div>
          <div>Ride Status: </div>
        </div>
        <div className="col-md-5">
          <div>
            <h2>Invoice</h2>
          </div>
          <div>
            <Table striped bordered hover>
              <thead style={{ background: "#4B76B6", color: "white" }}>
                <tr>
                  <th>Charges</th>
                  <th>Distance</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>Normal</td>
                  <td>14.3</td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total Amount
                  </td>

                  <td>$14.3</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
