import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { REDUCER } from "../utils/consts";
import { redirectHome } from "../utils/redirector";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { get } from "../utils/serverCall";
import { displayError } from "../utils/messages";

import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

function TrackRide() {
  const defaultValues = {};

  const startRide = () => {};
  const { Step } = Steps;
  const [rideDetails, setRideDetails] = useState({});

  const defaultRideStatus = 1; // 0:On the way;  1:Ready for pickup;  2:Started Ride;  3:Completed
  const [rideStatus, setRideStatus] = useState(defaultRideStatus);

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  console.log(params.get("id"));

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <Container>
        <h2>Ride Progress</h2>
        <Steps>
          <Step
            status={rideStatus === 0 ? "process" : "finish"}
            title="On the Way"
            icon={
              rideStatus === 0 ? <LoadingOutlined /> : <CheckCircleOutlined />
            }
          />
          <Step
            status={
              rideStatus < 1 ? "wait" : rideStatus === 1 ? "process" : "finish"
            }
            title="Ready for pickup"
            icon={
              rideStatus < 1 ? (
                <ClockCircleOutlined />
              ) : rideStatus === 1 ? (
                <LoadingOutlined />
              ) : (
                <CheckCircleOutlined />
              )
            }
          />
          <Step
            status={
              rideStatus < 2 ? "wait" : rideStatus === 2 ? "process" : "finish"
            }
            title="Ride Started"
            icon={
              rideStatus < 2 ? (
                <ClockCircleOutlined />
              ) : rideStatus === 2 ? (
                <LoadingOutlined />
              ) : (
                <CheckCircleOutlined />
              )
            }
          />
          <Step
            status="wait"
            title="Ride Completed"
            icon={
              rideStatus < 3 ? (
                <ClockCircleOutlined />
              ) : rideStatus === 3 ? (
                <LoadingOutlined />
              ) : (
                <CheckCircleOutlined />
              )
            }
          />
        </Steps>
      </Container>
      <Container style={{ marginTop: "32px" }}>
        <Row>
          <h2>Ride Details</h2>
        </Row>
        <Row>
          <Col>Ride ID: </Col>
          <Col>{rideDetails.id}</Col>
        </Row>
        <Row>
          <Col>Origin: </Col>
          <Col>{rideDetails.origin}</Col>
        </Row>
        <Row>
          <Col>Destination: </Col>
          <Col>{rideDetails.destination}</Col>
        </Row>
        <Row>
          <Col>Car Reg Number: </Col>
          <Col>{rideDetails.regNumber}</Col>
        </Row>
        <Row>
          <Col>Car Model: </Col>
          <Col>{rideDetails.model}</Col>
        </Row>
        <Row>
          <Col>Capacity: </Col>
          <Col>{rideDetails.capacity}</Col>
        </Row>
        <Row></Row>
      </Container>
    </div>
  );
}

export default TrackRide;
