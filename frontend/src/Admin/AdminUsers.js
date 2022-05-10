import React, { useEffect, useState } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table'
import { get, post } from "../utils/serverCall";
import { MdModeEditOutline } from "react-icons/md";
import { FloatingLabel, Form } from "react-bootstrap";
import {MdDelete} from 'react-icons/md';
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

function Adminusers(){

    const [users, setUsers] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [customer,setCustomer] = useState(0);
    const [carowner, setCarowner] = useState(0);
    const [admin, setAdmin] = useState(0);
    const [selectedUser, setSelectedUser] = useState("");
    const [redirectToDetails, setRedirectToDetails] = useState(false);

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
        get(`/getUsersAdmin`).then((response) => {
          setUsers(response);
          setCustomer(response.filter(item => item.role == 0).length);
          setCarowner(response.filter(item => item.role == 1).length);
          setAdmin(response.filter(item => item.role == 2).length);

        });

      }, []);

      const data = {
        labels: ['Customer', 'Car Owner', 'Admin'],
        datasets: [
          {
            label: 'Users',
            data: [customer, carowner, admin],
            backgroundColor: ["#83ce83", "#959595", "#f96a5d"],
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
            text: 'Bar ChartC',
          },
        },
      };
    
      const deleteUserDetails = (e) => {
        post(`/deleteUser`, {data: e.target.getAttribute("data")})
      .then((res) => {
        console.log(res);
        window.location.reload(true);
      })
      .catch((error) => {});
      };


    const { email, firstName, lastName, address, phone, role } = users;
    return (
        <div>
<div>
      {" "}
      <Container>
       
        <div style={{ margin: "20px", height: "400px", width: "400px" }}>
        <h2 className="mb-4 text-center">Users</h2>
          <MDBContainer>
            <Pie
              data={data}
            />
          </MDBContainer>
        </div>
      </Container>
    </div>
    <Container style={{marginTop: "5rem"}}>
        <Table striped bordered hover id="table">
        <thead>
                <tr class=" table-dark">
                  <th>S.No.</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th></th>
                </tr>
                </thead >
          <tbody>
            {users.map((data,index) => {
              return (
                data !== null && (
                  <tr key={data.email}>
                    <th scope="row">{index+1}</th>
                    <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.email}</td>
                      <td>{data.role}</td>
                      <td>{data.phone}</td>
                      <td>{data.address}</td>
                      <td>
                      <button type="button" class="btn btn-danger"  data={data.email}
                        onClick={deleteUserDetails}><MdDelete/>
                        Delete User</button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </Table>
        {users.length === 0 && <h2> No users. </h2>}
      </Container>
</div>
    )

}

export default Adminusers;