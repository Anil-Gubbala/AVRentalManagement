import React, { useEffect, useState } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table'
import { get, post } from "../utils/serverCall";
import { MdModeEditOutline } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import Popup from 'reactjs-popup';
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
import AddCar from "../components/AddCar";

import { Chart as ChartJS, CategoryScale,
  LinearScale,
  BarElement,
  Title, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title, ArcElement, Tooltip, Legend);


function Admincars(){


    const [cars, setCars] = useState([]);
    const [active,setActive] = useState(0);
    const [repair, setRepair] = useState(0);
    const [busy, setBusy] = useState(0);
    const [suv,setSuv] = useState(0);
    const [hatchback, setHatchback] = useState(0);
    const [sedan, setSedan] = useState(0);
    const [coupe,setCoupe] = useState(0);
    const [convertible, setConvertible] = useState(0);
    const [supermini, setSupermini] = useState(0);
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [redirToCar, setRedirToCar] = useState(false);
    const [carmakearray, setCarmakearray] = useState([]);
    const [carcountarray, setCarCount] = useState([]);
    const [carmake, setCarmake] = useState([]);
    const carmakeobject = {make: "", count: ""};
    const [carstatus, setStatus] = useState("");

    const [graph, setGraph] = useState({
        labels: [],
        data: [],
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
   
    useEffect(() => {
        const e = [];
        const f = [];
        get(`/getCarsAdmin`).then((response) => {
          setCars(response);
          setActive(response.filter(item => item.status == "Active").length);
        setRepair(response.filter(item => item.status === "InActive").length);
        setBusy(response.filter(item => item.status === "Busy").length);
        setSuv(response.filter(item => item.build == "SUV").length);
        setHatchback(response.filter(item => item.build === "Hatchback").length);
        setSedan(response.filter(item => item.build === "Sedan").length);
        setCoupe(response.filter(item => item.build === "Coupe").length);
        setConvertible(response.filter(item => item.build === "Convertible").length);
        setSupermini(response.filter(item => item.build === "Super Mini").length);

                      
var result = response.reduce( (acc, o) => (acc[o.make] = (acc[o.make] || 0)+1, acc), {} );
Object.entries(result).forEach(([key, value]) => {
  e.push(...carmakearray, `${key}`);
  f.push(...carcountarray, `${value}` );})
console.log(e);
console.log(f);
setCarmakearray(e);
setCarCount(f);
setGraph({
labels: e,
data: f,
});
        });
      
      }, []);
      


    
      const data = {
        labels: ['Active', 'InActive', 'Busy'],
        datasets: [
          {
            label: 'Car Status',
            data: [active, repair, busy],
            backgroundColor: ['#40C4FF', '#FF5252', '#00C853'],
            borderWidth: 1,
          },
        ],
      };

      const type = {
        labels: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Super Mini'],
        datasets: [
          {
            label: 'Car Build',
            data: [sedan, suv, hatchback, coupe, convertible, supermini],
            backgroundColor: ['#d72e3d', '#249d3d', '#ffb90c', '#40C4FF', '#FF5252', '#00C853' ],
            borderWidth: 1,
          },
        ],
      };

      const car = {
        labels: graph.labels,
        datasets: [
          {
            label: 'Car Make',
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

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Car Build',
          },
        },
      };

      // const updateCarStatus = async(id) => {
        
      //     console.log(carstatus);
      //   await post(`/updateStatus`, { status : carstatus, id: id  }).then((result) => {
      //     console.log(result);
      //     setOpen(false);
          
      //  });
      //   handleClose();
      // };

    const { ownerId, regNumber, model, make, color, build, status, capacity } = cars;

    const AddCar = (event) => {
        event.preventDefault();
        setRedirToCar(true);
      };
      let ad = null;
      console.log(redirToCar);
      if (redirToCar) 
      return(<Navigate to="/addcar" />);

    return (
        <div>
            <div className="d-flex flex-row">
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
      <div>
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Car Build</h2>
          <MDBContainer>
            <Bar
              data={type} options = {options}
            />
          </MDBContainer>
        </div>
      </Container>
    
    </div>
    </div>
    <div>
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Car Make</h2>
          <MDBContainer>
            <Pie
              data={car }
            />
          </MDBContainer>
        </div>
      </Container>
   
      </div>

    {/* <div style={{ margin: "20px", textAlign: "right" }}>
          <button type="submit" onClick={AddCar}>
            <h4>Add Car</h4>
          </button>
        </div> */}

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
                    <tr key={data.id}>
                      <th scope="row">{index+1}</th>
                      <td>{data.regNumber}</td>
                      <td>{data.ownerId}</td>
                      <td>{data.model}</td>
                      <td>{data.make}</td>
                      <td>{data.color}</td>
                      <td>{data.build}</td>
                      {/* <td><button onClick ={(e) => {console.log(e.target);setOpen(true);}} > < MdModeEditOutline/> Edit </button>
      {open ? (
      <Form  className="mb-3 text-primary">
      <Form.Group className="col">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                default= {data.status}
                value={carDetails?.status}
                onChange={(e) => {
                  // setCarDetails({ ...carDetails, status: e.target.value });
                  setStatus(e.targetvalue);
                }}
              >
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
                <option value="Busy">Busy</option>
              </Form.Control>
            </Form.Group>
      <button type = 'submit'>Save</button> 
      </Form> ) : (
   <div> {data.status}</div>)} </td> */}
                      <td>{data.status}</td>
                      <td>{data.capacity}</td>
                      <td>

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