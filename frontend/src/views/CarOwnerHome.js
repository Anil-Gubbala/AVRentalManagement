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
  const [redirToAddCar, setRedirToAddCar] = useState(false);
  const [redirToCarHistory, setRedirToCarHistory] = useState(false);
  const [carDetails, setCarDetails] = useState([]);

  const [selectedCar, setSelectedCar] = useState([]);

  const [selectedCarId, setSelectedCarId] = useState([]);

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
    setRedirToAddCar(true);
  };

  const EditCar = (event) => {
    event.preventDefault();
    setSelectedCar(event.target.getAttribute("data"));
    setRedirToCar(true);
  };

  const RideHistory = (event) => {
    event.preventDefault();
    console.log(event.target.getAttribute("carid"));
    setSelectedCarId(event.target.getAttribute("carid"));
    setRedirToCarHistory(true);
  };

  let editCarPage = null;
  if (redirToCar) editCarPage = <Navigate to={"/editcar?id=" + selectedCar} />;
  let addCarPage = null;
  if (redirToAddCar) addCarPage = <Navigate to={"/addcar"} />;
  let rideDetailPage = null;
  if (redirToCarHistory)
    rideDetailPage = (
      <Navigate to={"/carridehistory?id=" + selectedCarId.toString()} />
    );
  return (
    <div>
      {addCarPage}
      {editCarPage}
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
                        carid={car.id}
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
