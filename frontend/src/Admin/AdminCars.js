import React, { useEffect, useState } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table'
import { get, post } from "../utils/serverCall";
import { MdModeEditOutline } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";

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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AddCar from "../components/AddCar";
ChartJS.register(ArcElement, Tooltip, Legend);

function Admincars(){

    const [cars, setCars] = useState([]);
    const [active,setActive] = useState(0);
    const [repair, setRepair] = useState(0);
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [redirToCar, setRedirToCar] = useState(false);

   
    useEffect(() => {
        get(`/getCarsAdmin`).then((response) => {
          setCars(response);
        });
       setActive(cars.filter(item => item.status === "Active").length);
       setRepair(cars.filter(item => item.status === "Repair").length);
      }, []);
      
      const data = {
        labels: ['Active', 'Repair'],
        datasets: [
          {
            label: 'Car Status',
            data: [active, repair],
            backgroundColor: ["#83ce83", "#959595"],
            borderWidth: 1,
          },
        ],
      };

    const { ownerId, regNumber, model, make, color, build, status, capacity } = cars;

    const AddCar = (event) => {
        event.preventDefault();
        setRedirToCar(true);
      };

      let ad = null;
      console.log(redirToCar);
      if (redirToCar) ad = <Navigate to="/addcar" />;

    return (
        
        <div>
               <div>
      {" "}
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Car Status</h2>
          <MDBContainer>
            <Pie
              data={data}
            />
          </MDBContainer>
        </div>
      </Container>
    </div>
    <div style={{ margin: "20px", textAlign: "right" }}>
          <button type="submit" onClick={AddCar}>
            <h4>Add Car</h4>
          </button>
        </div>

        <div style={{marginTop: "5rem"}}>
            <table id="booking" style={{ width: "100%" }} class="table table-bordered">
                <thead>
                <tr class=" table-dark">
                  <th scope="col">S.No.</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">OwnerID</th>
                  <th scope="col">Model</th>
                  <th scope="col">Make</th>
                  <th scope="col">Color</th>
                  <th scope="col">Build</th>
                  <th scope="col">Status</th>
                  <th scope="col">Capacity</th>
                  <th scope="col"></th>
                </tr>
                </thead >
              <tbody >
                {cars
                  .map((data, index) => (
                    <tr key={data.email}>
                      <th scope="row">{index+1}</th>
                      <td>{data.regNumber}</td>
                      <td>{data.ownerId}</td>
                      <td>{data.model}</td>
                      <td>{data.make}</td>
                      <td>{data.color}</td>
                      <td>{data.build}</td>
                      <td>{data.status}</td>
                      <td>{data.capacity}</td>
                      <td>
                          <Button variant = "primary"  style={{
            cursor: "pointer",
            color: "#006080",
            textDecoration: "underline",
          }}
                           onClick={handleOpen} >< MdModeEditOutline/>Edit</Button>
                           <Modal
          open={open}
          // onClose={handleClose}
        >
          <Box >
              
            
           
          </Box>
        </Modal>

                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
        
    
</div>
    )

}

export default Admincars;