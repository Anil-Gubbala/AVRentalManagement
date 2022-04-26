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

    const [rides, setRides] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [customer,setCustomer] = useState(0);
    const [carowner, setCarowner] = useState(0);
    const [admin, setAdmin] = useState(0);

    const [invalid, setInvalid] = useState({
        password: false,
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        address: false,
        city: false,
        state: false,
        country: false,
        zipcode: false,
        gender: false,
        role: false,
      });
       
    useEffect(() => {
        get(`/getRides`).then((response) => {
          setRides(response);
        

        });

      }, []);

      const ridehistory =  [
        {
            "id": "91eb8e63-9eb6-4914-9236-645ae5d9ad2d",
            "userId": "poonam273713@gmail.com",
            "source": "Santa Clara",
            "destination": "San Francisco",
            "carId": "46",
            "startTime": "2022-04-24T22:16:57.816Z",
            "status": "active"
        },
     {
            "id": "79eb9e63-9eb6-4914-4356-645ae5d9ad2d",
            "userId": "poonam273713@gmail.com",
            "source": "Sunnyvale",
            "destination": "San Francisco",
            "carId": "46",
            "startTime": "2022-04-24T10:20:57.123Z",
            "status": "active"
        },
     {
            "id": "87958e63-9eb6-4214-9236-645a579ad2d",
            "userId": "poonam273713@gmail.com",
            "source": "Santa Clara",
            "destination": "San Francisco",
            "carId": "46",
            "startTime": "2022-04-24T3:23:57.542Z",
            "status": "active"
        },
     {
            "id": "762b8e63-9eb6-4314-9236-645ae5d9ad2d",
            "userId": "user1@gmail.com",
            "source": "Sunnyvale",
            "destination": "San Francisco",
            "carId": "36",
            "startTime": "2022-04-24T02:32:57.435Z",
            "status": "active"
        },
     {
            "id": "91aa8e63-9eb6-4914-9236-645ae5d9ad2d",
            "userId": "poonam273713@gmail.com",
            "source": "Santa Clara",
            "destination": "San Francisco",
            "carId": "46",
            "startTime": "2022-04-24T22:16:57.816Z",
            "status": "active"
        },
     {
            "id": "51eb8e63-9eb6-4914-9236-645ae5d9ad2d",
            "userId": "user1@gmail.com",
            "source": "Sunnyvale",
            "destination": "San Francisco",
            "carId": "36",
            "startTime": "2022-04-24T22:16:57.816Z",
            "status": "active"
        },
    ]

    const data = {
        labels: ['Sunnyvale', 'Santa Clara'],
        datasets: [
          {
            label: 'Source',
            data: [3,3],
            backgroundColor: ['#40C4FF', '#FF5252'],
            borderWidth: 1,
          },
        ],
      };
      const dest = {
        labels: ['San Francisco'],
        datasets: [
          {
            label: 'Destination',
            data: [3,3],
            backgroundColor: ['#40C4FF'],
            borderWidth: 1,
          },
        ],
      };


     
    const { userId, tripId, carId, source, destination, startTime, status } = rides;
    return (
        <div>
            <div className="d-flex flex-row">
        <div>
      {" "}
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Source</h2>
          <MDBContainer>
            <Pie
              data={data}
            />
          </MDBContainer>
        </div>
      </Container>
      </div>
      <div>
      {" "}
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Destination</h2>
          <MDBContainer>
            <Pie
              data={dest}
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
                {ridehistory
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