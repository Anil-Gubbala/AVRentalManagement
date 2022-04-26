import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { post, get } from "../utils/serverCall";
import { MDBContainer } from "mdbreact";
import { Pie, Bar } from "react-chartjs-2";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { Chart, ArcElement } from "chart.js";

const CarOwnerAnalytics = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCarHome, setRedirToCarHome] = useState(false);

  const [pieData, setPieData] = useState({
    labels: ["Newly Added", "Edited", "Deleted"],
    datasets: [
      {
        backgroundColor: ["#83ce83", "#959595", "#f96a5d"],
        data: [9, 5, 3, 4],
      },
    ],
  });

  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const getCarDetails = () => {
    get(`/getcardetails`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarDetails();
  }, []);

  const Back = (event) => {
    event.preventDefault();
    setRedirToCarHome(true);
  };
  let ad = null;
  if (redirToCarHome) ad = <Navigate to="/carownerhome" />;
  return (
    <>
      {ad}
      <Container>
        <h2 className="mb-4 text-center">Analytics</h2>
        <div style={{ margin: "20px", textAlign: "right" }}>
          <Button
            type="submit"
            onClick={Back}
            variant="dark"
            style={{ marginBottom: "8px", marginLeft: "20px" }}
          >
            Go Back
          </Button>
        </div>

        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
          <MDBContainer>
            <Pie
              data={pieData}
              options={{
                legend: { display: true, position: "right" },

                datalabels: {
                  display: true,
                  color: "white",
                },
                tooltips: {
                  backgroundColor: "#5a6e7f",
                },
              }}
            />
          </MDBContainer>
        </div>
      </Container>
    </>
  );
};

export default CarOwnerAnalytics;
