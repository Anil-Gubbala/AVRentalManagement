import React, { useEffect, useState } from "react";
import Axios from "axios";
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
  const [triparray, setTriparray] = useState([]);
  const [tripcountarray, setTripCount] = useState([]);
  const [cararray, setCararray] = useState([]);
  const [carcountarray, setCarCount] = useState([]);
    const [rides, setRides] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [customer,setCustomer] = useState(0);
    const [carowner, setCarowner] = useState(0);
    const [admin, setAdmin] = useState(0);

       
    useEffect(() => {
      const e = [];
      const f = [];
      const g = [];
      const h = [];
        get(`/getRides`).then((response) => {
          setRides(response);

var result = response.reduce( (acc, o) => (acc[o.userId] = (acc[o.userId] || 0)+1, acc), {} );
var carcount = response.reduce( (acc, o) => (acc[o.carId] = (acc[o.carId] || 0)+1, acc), {} );
Object.entries(result).forEach(([key, value]) => {
  e.push(...triparray, `${key}`);
  f.push(...tripcountarray, `${value}` );})

  Object.entries(carcount).forEach(([key, value]) => {
    g.push(...cararray, `${key}`);
    h.push(...carcountarray, `${value}` );})

 
setTriparray(e);
setTripCount(f);
setCararray(e);
setCarCount(f);
setCarGraph({
  labels: g,
  data: h,
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
            <div style={{marginTop: "5rem"}}>
            <table id="booking" style={{ width: "100%" }} class="table table-bordered">
                <thead>
                <tr class=" table-dark">
                  <th scope="col">S.No.</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Car Id</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">Status</th>

                </tr>
                </thead >
              <tbody >
                {rides
                  .map((data, index) => (
                    <tr key={data.user_id}>
                      <th scope="row">{index+1}</th>
                      <td>{data.userId}</td>
                      <td>{data.carId}</td>
                      <td>{data.source}</td>
                      <td>{data.destination}</td>
                      <td>{data.startTime}</td>
                      <td>
                          {data.status}

                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
        </div>
    
</div>
    )

}

export default AdminRides;