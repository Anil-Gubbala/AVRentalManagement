import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import Container from "react-bootstrap/esm/Container";

import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { get } from "../utils/serverCall";

function CarOwnerHome() {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCar, setRedirToCar] = useState(false);
  const [redirToCarHistory, setRedirToCarHistory] = useState(false);
  const [carDetails, setCarDetails] = useState([]);

  const [selectedCar, setSelectedCar] = useState([]);

  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const getCarDetails = () => {
    get(`/getownercars`)
      .then((response) => {
        console.log(response);
        setCarDetails(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarDetails();
  }, []);

  const AddCar = (event) => {
    event.preventDefault();
    setRedirToCar(true);
  };

  const EditCar = (event) => {
    event.preventDefault();
    setSelectedCar(event.target.getAttribute("data"));
    setRedirToCar(true);
  };

  const RideHistory = (event) => {
    event.preventDefault();
    setSelectedCar(event.target.getAttribute("data"));
    setRedirToCarHistory(true);
  };

  let addCarPage = null;
  if (redirToCar) addCarPage = <Navigate to={"/editcar?id=" + selectedCar} />;
  let rideDetailPage = null;
  if (redirToCarHistory)
    rideDetailPage = <Navigate to={"/carridehistory?id=" + selectedCar} />;
  return (
    <div>
      {addCarPage}
      {rideDetailPage}
      <Container>
        <h2 className="mb-4 text-center">Car Owner Home</h2>
        <div style={{ margin: "20px", textAlign: "right" }}>
          <Button
            type="submit"
            onClick={AddCar}
            variant="dark"
            style={{ marginBottom: "8px" }}
          >
            Add Car
          </Button>
        </div>
        <div>
          <Table striped bordered hover>
            <thead
              style={{
                background: "#000000",
                color: "white",
              }}
            >
              <tr>
                <th>Number</th>
                <th>Make</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carDetails.map((car) => {
                return (
                  <tr key={car.regNumber}>
                    <td>{car.regNumber}</td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.capacity}</td>
                    <td>
                      <Button
                        type="submit"
                        onClick={EditCar}
                        variant="dark"
                        style={{ marginBottom: "8px" }}
                        data={car.regNumber}
                      >
                        Edit
                      </Button>

                      <Button
                        type="submit"
                        onClick={RideHistory}
                        variant="dark"
                        style={{ marginBottom: "8px", marginLeft: "20px" }}
                        data={car.regNumber}
                      >
                        Ride History
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default CarOwnerHome;
