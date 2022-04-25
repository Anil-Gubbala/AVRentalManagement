import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { post, get } from "../utils/serverCall";
import { Button, FloatingLabel, Table } from "react-bootstrap";

const EditCar = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);

  const [message, setMessage] = useState("");
  const [redirToCarHome, setRedirToCarHome] = useState(false);

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  console.log(params.get("id"));

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

  const getCarDetails = () => {
    get(`/getCar`, params.get("id"))
      .then((response) => {
        console.log(response);
        let details = {
          number: response.regNumber,
          make: response.make,
          model: response.model,
          color: response.color,
          build: response.build,
          status: response.status,
          capacity: response.capacity,
        };
        setCarDetails(details);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarDetails();
  }, []);

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
      console.log(carDetails);
      post(`/addcar`, {
        carDetails,
      })
        .then((response) => {
          console.log(`Car Added Successfully`);
          console.log(response);
          setMessage(`Car Added Successfully`);
          setRedirToCarHome(true);
        })
        .catch((error) => {
          setMessage(error);
        });
    }
  };
  const Cancel = (event) => {
    event.preventDefault();
    setRedirToCarHome(true);
  };
  let ad = null;

  if (params.get("id") === null) {
    return <Navigate to={redirectHome()} />;
  }

  if (redirToCarHome) ad = <Navigate to="/carownerhome" />;
  return (
    <div>
      {ad}
      <Container style={{ maxWidth: "800px" }}>
        <h2 className="mb-4 text-center">Update Car</h2>

        <Form>
          <div className="row">
            <Form.Group className="col">
              <FloatingLabel label="Number">
                <Form.Control
                  type="text"
                  helpertext={invalid.number ? "1-10 characters" : ""}
                  id="carNumber"
                  label="Number"
                  value={carDetails.number}
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
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="col">
              <FloatingLabel label="Make">
                <Form.Control
                  type="text"
                  value={carDetails.make}
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
              </FloatingLabel>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col">
              <FloatingLabel label="Model">
                <Form.Control
                  type="text"
                  value={carDetails.model}
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
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="col">
              <FloatingLabel label="Color">
                <Form.Control
                  type="text"
                  value={carDetails.color}
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
              </FloatingLabel>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col">
              <FloatingLabel label="Build">
                <Form.Control
                  as="select"
                  value={carDetails?.build}
                  onChange={(e) => {
                    setCarDetails({ ...carDetails, build: e.target.value });
                  }}
                >
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                </Form.Control>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="col">
              <FloatingLabel label="Status">
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
              </FloatingLabel>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="col">
              <FloatingLabel label="Capacity">
                <Form.Control
                  type="number"
                  value={carDetails.capacity}
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
              </FloatingLabel>
            </Form.Group>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              type="submit"
              onClick={Submit}
              variant="dark"
              style={{ marginBottom: "8px" }}
            >
              Update Car
            </Button>

            <Button
              type="submit"
              onClick={Cancel}
              variant="dark"
              style={{ marginBottom: "8px", marginLeft: "20px" }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditCar;
