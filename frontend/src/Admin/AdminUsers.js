import React, { useEffect, useState } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table'
import { get, post } from "../utils/serverCall";
import { MdModeEditOutline } from "react-icons/md";
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

function Adminusers(){


    const [users, setUsers] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
       
    useEffect(() => {
        get(`/getUsersAdmin`).then((response) => {
          setUsers(response);
        });

      }, []);


    const { email, firstName, lastName, address, phone, role } = users;
    return (
        <div>

        
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
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add miles
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Select Miles
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="Country"
                onChange={(e) => {
                  console.log(e.target.value);
                  // setUserUpdated({
                  //   ...userUpdated,
                  //   details: {
                  //     ...userUpdated.details,
                  //     country: e.target.value,
                  //   },
                  // });
                }}
              >
              </Select>
            </Typography>
            <Button
              style={{
                color: "#ffff",
                backgroundColor: "#0d9cdf",
                margin: "5px",
              }}
              type="submit"
            >
              <h6>Add</h6>
            </Button>
            <Button
              style={{
                color: "#ffff",
                backgroundColor: "#0d9cdf",
                margin: "5px",
              }}
              type="submit"
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
    )

}

export default Adminusers;