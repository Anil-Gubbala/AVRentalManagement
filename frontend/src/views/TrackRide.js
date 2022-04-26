import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {REDUCER} from "../utils/consts";
import {redirectHome} from "../utils/redirector";
import "./style.css";
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
    Table,
} from "react-bootstrap";
import {get} from "../utils/serverCall";
import {displayError} from "../utils/messages";

import {Image, Steps} from "antd";
import {
    UserOutlined,
    SolutionOutlined,
    LoadingOutlined,
    SmileOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

function TrackRide() {
    const defaultValues = {};

    const {Step} = Steps;
    const [rideDetails, setRideDetails] = useState({});

    const defaultRideStatus = 2; // 0:On the way;  1:Ready for pickup;  2:Started Ride;  3:Completed
    const [rideStatus, setRideStatus] = useState(defaultRideStatus);

    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const tripId = params.get("id");
    // console.log(tripId);

    useEffect(() => {
        const interval = setInterval(() => {
            trackRide()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const trackRide = () => {
        if (rideStatus > 3) {
            // console.log("Ride completed, hence not tracking");
            return;
        }
        axios
            .get("trackRide/" + tripId)
            .then((result) => {
                if (result.status === 200) {
                    console.log(
                        'Successfully retrieved Trip Data as ' + result.data,
                    )
                    setRideDetails({...result.data});
                    setRideStatus(result.data.trip_status === "inactive" ? 4 : 3);
                }
            })
            .catch((error) => {
                console.log(error)
                displayError(error)
            })
    };

    return (
        <div style={{maxWidth: "800px", margin: "auto"}}>
            <Container>
                <h2>Ride Progress</h2>
                <Steps>
                    <Step
                        status={rideStatus === 0 ? "process" : "finish"}
                        title="On the Way for pickup"
                        icon={
                            rideStatus === 0 ? <LoadingOutlined/> : <CheckCircleOutlined/>
                        }
                    />
                    {/*<Step*/}
                    {/*  status={*/}
                    {/*    rideStatus < 1 ? "wait" : rideStatus === 1 ? "process" : "finish"*/}
                    {/*  }*/}
                    {/*  title="Ready for pickup"*/}
                    {/*  icon={*/}
                    {/*    rideStatus < 1 ? (*/}
                    {/*      <ClockCircleOutlined />*/}
                    {/*    ) : rideStatus === 1 ? (*/}
                    {/*      <LoadingOutlined />*/}
                    {/*    ) : (*/}
                    {/*      <CheckCircleOutlined />*/}
                    {/*    )*/}
                    {/*  }*/}
                    {/*/>*/}
                    <Step
                        status={
                            rideStatus < 2 ? "wait" : rideStatus === 2 ? "process" : "finish"
                        }
                        title="Ride Started"
                        icon={
                            rideStatus < 2 ? (
                                <ClockCircleOutlined/>
                            ) : rideStatus === 2 ? (
                                <LoadingOutlined/>
                            ) : (
                                <CheckCircleOutlined/>
                            )
                        }
                    />
                    <Step
                        status={
                            rideStatus < 3 ? "wait" : rideStatus === 3 ? "process" : "finish"
                        }
                        title="Ride Completed"
                        icon={
                            rideStatus < 3 ? (
                                <ClockCircleOutlined/>
                            ) : rideStatus === 3 ? (
                                <LoadingOutlined/>
                            ) : (
                                <CheckCircleOutlined/>
                            )
                        }
                    />
                </Steps>
            </Container>
            <Container style={{marginTop: "32px"}}>
                <Row>
                    <h2>Ride Details</h2>
                </Row>
                <Row>
                    <Col>Ride ID: </Col>
                    <Col>{rideDetails.trip_id}</Col>
                </Row>
                <Row>
                    <Col>Distance: </Col>
                    <Col>{rideDetails.distance || 'n/a'}</Col>
                </Row>
                {rideDetails.make && <Row>
                    <Col>Car (make & model): </Col>
                    <Col>{`${rideDetails.make || ''} ${rideDetails.model || ''}`}</Col>
                </Row>}
                <Row>
                    <Col>Source: </Col>
                    <Col>{rideDetails.source}</Col>
                    <Col>Destination: </Col>
                    <Col>{rideDetails.destination}</Col>
                </Row>
                <Row>
                    <h2>Ride Tracking</h2>
                </Row>
                <Row>
                    <Col>Time elapsed (seconds): </Col>
                    <Col>{rideDetails.timestamp}</Col>
                </Row>
                <Row>
                    <Col>Latitude: </Col>
                    <Col>{rideDetails.latitude}</Col>
                </Row>
                <Row>
                    <Col>Longitude: </Col>
                    <Col>{rideDetails.longitude}</Col>
                </Row>
                <Row>
                    <Col>Distance remaining: </Col>
                    <Col>{rideStatus > 3 ? 0 : rideDetails.distance_remaining}</Col>
                </Row>
                <Row>
                    <Col>Latest snapshot: </Col>
                    <Col><RenderSmoothImage src={rideDetails.camera_url} alt={"Camera image"}/></Col>
                </Row>
                <Row></Row>
            </Container>
        </div>
    );
}

function RenderSmoothImage({src, alt}) {
    const [imageLoaded, setImageLoaded] = React.useState(false);

    return (
        <div className="smooth-image-wrapper">
            <img
                src={src}
                alt={alt}
                className={`smooth-image image-${
                    imageLoaded ? 'visible' : 'hidden'
                }`}
                onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
                <div className="smooth-preloader">
                    <span className="loader"/>
                </div>
            )}
        </div>
    )
}

export default TrackRide;
