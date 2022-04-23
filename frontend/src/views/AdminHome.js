import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Container from "react-bootstrap/esm/Container";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

function AdminHome() {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);

  const [pieData, setPieData] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const config = {
    type: "pie",
    data: pieData,
  };
  // if (role !== "2") {
  //   return <Navigate to={redirectHome()} />;
  // }
  return (
    <div>
      {" "}
      <Container>
        <h2 className="mb-4 text-center">Admin Home</h2>
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
          <MDBContainer>
            <Pie data={config.data} options={{ responsive: true }} />
          </MDBContainer>
        </div>
      </Container>
    </div>
  );
}

export default AdminHome;
