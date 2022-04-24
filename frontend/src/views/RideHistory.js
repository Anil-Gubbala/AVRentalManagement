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

const RideHistory = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCar, setRedirToCar] = useState(false);

  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  return (
    <div>
      <Container>
        <h2 className="mb-4 text-center">Ride History</h2>
      </Container>
      <Container>
        <Table striped bordered hover>
          <thead style={{ background: "#000000", color: "white" }}>
            <tr>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <div
                  style={{
                    background: "#9fd5a5",
                    borderRadius: "15px",
                    textAlign: "center",
                    display: "inherit",
                    padding: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Normal
                </div>
              </td>
            </tr>
            <tr>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <div
                  style={{
                    background: "rgb(212 100 121)",
                    borderRadius: "15px",
                    textAlign: "center",
                    display: "inherit",
                    padding: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Collision
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default RideHistory;
