import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { post } from "../utils/serverCall";

const AddCar = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);

  const [message, setMessage] = useState("");
  const [redirToCarHome, setRedirToCarHome] = useState(false);
  const [invalid, setInvalid] = useState({
    number: false,
    make: false,
    model: false,
    color: false,
    build: false,
    status: false,
    capacity: false,
  });
  const defaultValues = {
    number: "",
    make: "",
    model: "",
    color: "",
    build: "SUV",
    status: "Active",
    capacity: "",
  };

  const [carDetails, setCarDetails] = useState(defaultValues);

  //   if (role !== "1") {
  //     return <Navigate to={redirectHome()} />;
  //   }
  const Submit = (event) => {
    event.preventDefault();

    if (
      carDetails.number.includes(" ") ||
      carDetails.make.includes(" ") ||
      carDetails.model.includes(" ") ||
      carDetails.color.includes(" ")
    ) {
      alert("Space character not allowed in number, make, model and color");
      setMessage(
        "Space character not allowed in number, make, model and color"
      );
    } else {
      // post(`/addcar`, {
      //   carDetails,
      // })
      //   .then((response) => {
      //     console.log(response);
      //     setMessage(`Car Added Successfully`);
      //   })
      //   .catch((error) => {
      //     setMessage(error.response.err);
      //   });
      console.log(carDetails);
    }
  };
  const Cancel = (event) => {
    event.preventDefault();
    setRedirToCarHome(true);
  };
  let ad = null;
  if (redirToCarHome) ad = <Navigate to="/carownerhome" />;
  return (
    <div>
      {ad}
      <Container>
        <h2 className="mb-4 text-center">Add Car</h2>

        <Form>
          <div className="row">
            <Form.Group className="col">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                helpertext={invalid.number ? "1-10 characters" : ""}
                id="carNumber"
                label="Number"
                isInvalid={invalid.number}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 10 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, number: validation });
                  setCarDetails({
                    ...carDetails,
                    number: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="col">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                helpertext={invalid.make ? "1-10 characters" : ""}
                id="carMake"
                label="Make"
                isInvalid={invalid.make}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 10 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, make: validation });
                  setCarDetails({
                    ...carDetails,
                    make: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                helpertext={invalid.model ? "1-10 characters" : ""}
                id="carModel"
                label="Model"
                isInvalid={invalid.model}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 10 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, model: validation });
                  setCarDetails({
                    ...carDetails,
                    model: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="col">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                helpertext={invalid.color ? "1-10 characters" : ""}
                id="carColor"
                label="Color"
                isInvalid={invalid.color}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 10 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, color: validation });
                  setCarDetails({
                    ...carDetails,
                    color: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col">
              <Form.Label>Build</Form.Label>
              <Form.Control
                as="select"
                default="SUV"
                value={carDetails?.build}
                onChange={(e) => {
                  setCarDetails({ ...carDetails, build: e.target.value });
                }}
              >
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="col">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                default="Active"
                value={carDetails?.status}
                onChange={(e) => {
                  setCarDetails({ ...carDetails, status: e.target.value });
                }}
              >
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
                <option value="Busy">Busy</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="col">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                helpertext={invalid.capacity ? "Greater than 0" : ""}
                id="carCapacity"
                label="Capacity"
                isInvalid={invalid.capacity}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value < 1 || e.target.value === ""
                  );
                  setInvalid({ ...invalid, capacity: validation });
                  setCarDetails({
                    ...carDetails,
                    capacity: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button type="submit" onClick={Submit}>
              <h4>Add Car</h4>
            </button>
            <button style={{ marginLeft: "20px" }} onClick={Cancel}>
              <h4>Cancel</h4>
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddCar;
