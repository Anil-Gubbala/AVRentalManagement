import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import Container from "react-bootstrap/esm/Container";

import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { get, post } from "../utils/serverCall";

function CarStatus() {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [carDetails, setCarDetails] = useState([]);

  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const changeStatus = (car) => {
    post(`/makeactive`, {
      id: car.id,
    })
      .then((response) => {
        console.log(response);
        console.log("testing");
        let arr = carDetails.filter((e) => e.id !== car.id);
        console.log(arr);
        setCarDetails([...arr]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCarDetails = () => {
    get(`/repaircars`)
      .then((response) => {
        console.log("Repairs");
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

  return (
    <div>
      <Container>
        <h2 className="mb-4 text-center">Car Status</h2>

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
                        onClick={() => changeStatus(car)}
                        variant="dark"
                        style={{ marginBottom: "8px", marginLeft: "20px" }}
                      >
                        Make Active
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

export default CarStatus;
