import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import { get, post } from "../utils/serverCall";
import { MdModeEditOutline } from "react-icons/md";
import { FloatingLabel, Form } from "react-bootstrap";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Modal,
    Typography,
    Input,
    FormHelperText,
    Select,
    MenuItem,
  } from "@mui/material";
  import { Pie, Bar } from "react-chartjs-2";
  import { MDBContainer } from "mdbreact";
  import Container from "react-bootstrap/esm/Container";
  
  import { Chart as ChartJS, CategoryScale,
    LinearScale,
    BarElement,
    Title, ArcElement, Tooltip, Legend } from 'chart.js';
 
  ChartJS.register(CategoryScale,
    LinearScale,
    BarElement,
    Title, ArcElement, Tooltip, Legend);

function AdminRides(){

  const [graph, setGraph] = useState({
    labels: [],
    data: [],
  });
  const [cargraph, setCarGraph] = useState({
    labels: [],
    data: [],
  });
  const [srcgraph, setSrcGraph] = useState({
    labels: [],
    data: [],
  });
  const [dstgraph, setDstGraph] = useState({
    labels: [],
    data: [],
  });
  const [triparray, setTriparray] = useState([]);
  const [tripcountarray, setTripCount] = useState([]);
  const [cararray, setCararray] = useState([]);
  const [carcountarray, setCarCount] = useState([]);
  const [srcarray, setSrcarray] = useState([]);
  const [srccountarray, setSrcCount] = useState([]);
  const [dstarray, setDstarray] = useState([]);
  const [dstcountarray, setDstCount] = useState([]);
    const [rides, setRides] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [customer,setCustomer] = useState(0);
    const [carowner, setCarowner] = useState(0);
    const [admin, setAdmin] = useState(0);

  const [selectedRide, setSelectedRide] = useState("");
  const [redirectToDetails, setRedirectToDetails] = useState(false);

       
    useEffect(() => {
      const e = [];
      const f = [];
      const g = [];
      const h = [];
      const i = [];
      const j = [];
      const k = [];
      const l = [];
        get(`/getRides`).then((response) => {
          setRides(response);
          console.log(response);

var result = response.reduce( (acc, o) => (acc[o.userId] = (acc[o.userId] || 0)+1, acc), {} );
var carcount = response.reduce( (acc, o) => (acc[o.carId] = (acc[o.carId] || 0)+1, acc), {} );
var srccount = response.reduce( (acc, o) => (acc[o.source] = (acc[o.source] || 0)+1, acc), {} );
var dstcount = response.reduce( (acc, o) => (acc[o.destination] = (acc[o.destination] || 0)+1, acc), {} );
Object.entries(result).forEach(([key, value]) => {
  e.push(...triparray, `${key}`);
  f.push(...tripcountarray, `${value}` );})

Object.entries(carcount).forEach(([key, value]) => {
  g.push(...cararray, `${key}`);
  h.push(...carcountarray, `${value}` );})


Object.entries(srccount).forEach(([key, value]) => {
  i.push(...srcarray, `${key}`);
  j.push(...srccountarray, `${value}` );})

Object.entries(dstcount).forEach(([key, value]) => {
  k.push(...dstarray, `${key}`);
  l.push(...dstcountarray, `${value}` );})

 
setTriparray(e);
setTripCount(f);
setCararray(g);
setCarCount(h);
setSrcarray(i);
setSrcCount(j);
setDstarray(k);
setDstCount(l);
setCarGraph({
  labels: g,
  data: h,
  });
setSrcGraph({
  labels: i,
  data: j,
  });
setDstGraph({
  labels: k,
  data: l,
  });
setGraph({
  labels: e,
  data: f,
  });

        });

      }, []);


  

      const trip = {
        labels: graph.labels,
        datasets: [
          {
            label: 'Trip users',
            data: graph.data,
            backgroundColor: [
                '#d72e3d', '#249d3d', '#ffb90c',
                '#40C4FF', '#FF5252', '#00C853',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderWidth: 1,
          },
        ],
      };

      const car = {
        labels: cargraph.labels,
        datasets: [
          {
            label: 'Trip Cars',
            data: cargraph.data,
            backgroundColor: [
                '#d72e3d', '#249d3d', '#ffb90c',
                '#40C4FF', '#FF5252', '#00C853',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderWidth: 1,
          },
        ],
      };

      const src = {
        labels: srcgraph.labels,
        datasets: [
          {
            label: 'Trip Source',
            data: srcgraph.data,
            backgroundColor: [
                '#d72e3d', '#249d3d', '#ffb90c',
                '#40C4FF', '#FF5252', '#00C853',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderWidth: 1,
          },
        ],
      };

      const dst = {
        labels: dstgraph.labels,
        datasets: [
          {
            label: 'Trip Destination',
            data: dstgraph.data,
            backgroundColor: [
                '#d72e3d', '#249d3d', '#ffb90c',
                '#40C4FF', '#FF5252', '#00C853',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Trip Users',
          },
        },
      };

      const viewRideDetails = (e) => {
        setSelectedRide(e.target.getAttribute("data"));
        setRedirectToDetails(true);
      };

      if (redirectToDetails) {
        return <Navigate to={"/ridedetails?id=" + selectedRide} />;
      }
     
    const { userId, tripId, carId, source, destination, startTime, status } = rides;
    return (
        <div>
            <div className="d-flex flex-row">

      <div>
      {" "}
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Trip Users</h2>
          <MDBContainer>
            <Bar
              data={trip} options = {options}
            />
          </MDBContainer>
        </div>
      </Container>
      </div>
      <div>
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Trip Cars</h2>
          <MDBContainer>
            <Bar
              data={car} options = {options}
            />
          </MDBContainer>
        </div>
      </Container>
    </div>
    </div>
    <div className="d-flex flex-row">
    <div>
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Source</h2>
          <MDBContainer>
            <Pie
              data={src} options = {options}
            />
          </MDBContainer>
        </div>
      </Container>
    </div>
    <div>
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Destination</h2>
          <MDBContainer>
            <Pie
              data={dst} options = {options}
            />
          </MDBContainer>
        </div>
      </Container>
    </div>
</div>
<Container style = {{marginTop: "3rem"}}>
        <Table striped bordered hover id="table">
          <thead style={{ background: "#000000", color: "white" }}>
            <tr>
            <th>S.No.</th>
            <th>Ride ID</th>
            <th>Email Id</th>
            <th>Car Id</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Start Time</th>
            <th>Status</th>
            <th>Collision</th>
            <th>Details</th>

            </tr>
          </thead>
          <tbody>
            {rides.map((ride,index) => {
              return (
                ride !== null && (
                  <tr key={ride.id}>
                    <th scope="row">{index+1}</th>
                      <td>{ride.id}</td>
                      <td>{ride.userId}</td>
                      <td>{ride.carId}</td>
                      <td>{ride.source}</td>
                      <td>{ride.destination}</td>
                      <td>{ride.startTime}</td>
                    <td>{ride.status}</td>
                    <td>{ride.collision}</td>
                    <td>
                      <Button
                        data={ride.id}
                        variant="dark"
                        onClick={viewRideDetails}
                      >
                        View Ride
                      </Button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </Table>
        {rides.length === 0 && <h2> No rides booked. </h2>}
      </Container>
    
</div>
    )

}

export default AdminRides;