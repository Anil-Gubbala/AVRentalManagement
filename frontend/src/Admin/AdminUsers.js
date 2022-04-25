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

function Adminusers(){

    const [users, setUsers] = useState([]);
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
            <div style={{marginTop: "5rem"}}>
            <table id="booking" style={{ width: "100%" }} class="table table-bordered">
                <thead>
                <tr class=" table-dark">
                  <th scope="col">S.No.</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col"></th>
                </tr>
                </thead >
              <tbody >
                {users
                  .map((data, index) => (
                    <tr key={data.email}>
                      <th scope="row">{index+1}</th>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.email}</td>
                      <td>{data.role}</td>
                      <td>{data.phone}</td>
                      <td>{data.address}</td>
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
          <Form style={{ maxWidth: "600px", margin: "auto" }}>
       
          <Form.Group>
            {/* <Form.Label>First Name</Form.Label> */}
            <FloatingLabel label="First Name">
              <Form.Control
                type="text"
                helpertext={invalid.firstName ? "1-25 characters" : ""}
                id="register-first-name"
                label="First Name"
                isInvalid={invalid.first_name}
                value={data.firstName}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 || e.target.value === ""
                  );
                //   setInvalid({ ...invalid, firstName: validation });
                //   setUserDetails({
                //     ...userDetails,
                //     firstName: e.target.value,
                //   });
                }}
              />
            </FloatingLabel>
          </Form.Group>
    
          <Form.Group >
            <FloatingLabel label="Last Name">
              <Form.Control
                required
                helpertext={invalid.lastName ? "1-25 characters" : ""}
                id="register-last-name"
                label="Last Name"
                value={data.lastName}
                type="text"
                isInvalid={invalid.lastName}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 || e.target.value === ""
                  );
                //   setInvalid({ ...invalid, lastName: validation });
                //   setUserDetails({
                //     ...userDetails,
                //     lastName: e.target.value,
                //   });
                }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group >
            <FloatingLabel label="email">
              <Form.Control
                required
                helpertext={invalid.email ? "1-25 characters" : ""}
                id="register-last-name"
                label="Last Name"
                value={data.email}
                type="text"
                isInvalid={invalid.lastName}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 || e.target.value === ""
                  );
                //   setInvalid({ ...invalid, lastName: validation });
                //   setUserDetails({
                //     ...userDetails,
                //     lastName: e.target.value,
                //   });
                }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group >
            <FloatingLabel label="Role">
              <Form.Control
                required
                helpertext={invalid.role}
                id="register-role"
                label="Last Name"
                value={data.role}
                type="number"
                isInvalid={invalid.role}
                onChange={(e) => {
                  const validation = !!(
                    e.target.value.length > 25 || e.target.value === ""
                  );
                //   setInvalid({ ...invalid, lastName: validation });
                //   setUserDetails({
                //     ...userDetails,
                //     lastName: e.target.value,
                //   });
                }}
              />
            </FloatingLabel>
          </Form.Group>
    
          <Form.Group>
            <FloatingLabel label="Phone Number">
              <Form.Control
                required
                id="register-phone"
                type="number"
                isInvalid={invalid.phone}
                value={data.phone}
                onChange={(e) => {
                  const validation = e.target.value.length !== 10;
                //   setInvalid({ ...invalid, phone: validation });
                //   setUserDetails({
                //     ...userDetails,
                //     phone: e.target.value,
                //   });
                }}
              />
            </FloatingLabel>
          </Form.Group>
        <Form.Group>
          <FloatingLabel label="Address">
            <Form.Control
              required
              helpertext={invalid.address ? "1-25 characters" : ""}
              id="register-street"
              label="Street"
              type="text"
              isInvalid={invalid.street}
              value={data.address}
              onChange={(e) => {
                const validation = !!(
                  e.target.value.length > 25 || e.target.value === ""
                );
                // setInvalid({ ...invalid, address: validation });
                // setUserDetails({ ...userDetails, address: e.target.value });
              }}
            />
          </FloatingLabel>
          </Form.Group>

        <br />

        <div>
          <Button type="submit" variant="dark">
            Update Profile
          </Button>
        </div>
      </Form>
            <Button
              style={{
                color: "#ffff",
                backgroundColor: "#0d9cdf",
                margin: "5px",
              }}
              type="Save"
            >
              <h6>Add</h6>
            </Button>
            <Button
              style={{
                color: "#ffff",
                backgroundColor: "#0d9cdf",
                margin: "5px",
              }}
              type="Close"
              onClick={handleClose}
            >
              <h6>Close</h6>
            </Button>
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

export default Adminusers;