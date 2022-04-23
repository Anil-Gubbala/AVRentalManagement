import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";

function CarOwnerHome() {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCar, setRedirToCar] = useState(false);

  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const AddCar = (event) => {
    event.preventDefault();
    setRedirToCar(true);
  };
  let ad = null;
  if (redirToCar) ad = <Navigate to="/addcar" />;
  return (
    <div>
      {ad}
      <Container>
        <h2 className="mb-4 text-center">Car Owner Home</h2>
        <div style={{ margin: "20px", textAlign: "right" }}>
          <button type="submit" onClick={AddCar}>
            <h4>Add Car</h4>
          </button>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Number</th>
                <th>Make</th>
                <th>Model</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default CarOwnerHome;
