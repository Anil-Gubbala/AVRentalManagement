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
    labels: ["Newly Added", "Edited", "Deleted"].map(
      (label, index) => `${label}: ${[9, 5, 3][index]}`
    ),
    datasets: [
      {
        label: "Markets Monitored",
        backgroundColor: ["#83ce83", "#959595", "#f96a5d"],
        data: [9, 5, 3],
      },
    ],
  });

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
    </div>
  );
}

export default AdminHome;
