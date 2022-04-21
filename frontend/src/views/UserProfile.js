import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { REDUCER } from "../utils/consts";
import { get } from "../utils/serverCall";
import { post } from "../utils/serverCall";

function UserProfile() {
  const [userProfile, setUserProfile] = useState([]);
  const history = useHistory();
  const [passData, setPassData] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // console.log(id);
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));

  const returnToSignIn = () => {
    history.push("/signin");
  };

  if (!isSignedIn) {
    returnToSignIn();
  }

  const getDetails = () => {
    get(`/getUserProfile`)
      .then((response) => {
        setUserProfile(response);
        console.log(userProfile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const updatePassport = () => {
    post(`/updatePassport`, { passportid: passData }).then((result) => {
      console.log(result);
      window.location = "/userProfile";
    });
  };

  return (
    <div>
      <form className="flight-book-form">
        <div className="Mileage-form-box">
          <h3 style={{ marginTop: "20px" }}>
            User Profile{"      "}
            <MdModeEdit
              style={{ marginLeft: "20px" }}
              onClick={() => {
                setShow(true);
                getDetails();
              }}
            />
          </h3>
          <br />
          {userProfile.map((data, index) => (
            <div>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                First Name : {data.customer_first_name}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Last Name : {data.customer_last_name}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Email Id : {data.emailid}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Address : {data.address}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                City : {data.city}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                State : {data.state}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Zip Code : {data.zip_code}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Passport: {data.passportid}
              </h5>

              <br />
              <br />
            </div>
          ))}
        </div>
      </form>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Update Passport Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updatePassport} className="mb-3 text-primary">
            {userProfile.map((data, key) => (
              <Form.Group controlId="formFile" className="mb-3 text-primary">
                <Form.Label>Passport Number</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="text"
                  name="src"
                  defaultValue={data.passportid}
                  required
                  onChange={(e) => {
                    setPassData(e.target.value);
                  }}
                />
                <Button type="submit">Update Details</Button>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;
