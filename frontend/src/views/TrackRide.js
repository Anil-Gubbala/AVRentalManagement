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

function TrackRide(props) {
    const defaultValues = {};

    const {Step} = Steps;
    const [rideDetails, setRideDetails] = useState({});

    const defaultRideStatus = -1; // 0:On the way;   1:Started Ride;  2:Completed
    const [rideStatus, setRideStatus] = useState(defaultRideStatus);

    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const tripId = props.id || params.get("id");
    var tempRideStatus = -1;
    // console.log(tripId);

    useEffect(() => {
        const interval = setInterval(() => {
            trackRide()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const trackRide = () => {
        if (tempRideStatus === 3) {
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
                    let status = -1;
                    if (result.data.trip_status === "inactive") status = 3;
                    if (result.data.trip_status === "active") status = 2;
                    if (result.data.trip_status === "pickedup") status = 1;
                    if (result.data.trip_status === "pickup") status = 0;
                    setRideStatus(status);
                    tempRideStatus = status;
                }
            })
            .catch((error) => {
                console.log(error)
                displayError(error)
            })
    };

    return (
        <div style={{margin: "auto"}}>
            <Container>
                <h2>Ride Progress</h2>
                <Steps>
                    <Step
                        status={
                            rideStatus < 0 ? "wait" : rideStatus === 0 ? "process" : "finish"
                        }
                        title="On the Way for pickup"
                        icon={
                            rideStatus < 0 ? (
                                <ClockCircleOutlined/>
                            ) : rideStatus === 0 ? (
                                <LoadingOutlined/>
                            ) : (
                                <CheckCircleOutlined/>
                            )
                        }
                    />
                    <Step
                        status={
                            rideStatus < 1 ? "wait" : rideStatus === 1 ? "process" : "finish"
                        }
                        title={`Ride Started ${rideStatus === 1 ? "(" + rideDetails.progress + ")" : ""}`}
                        icon={
                            rideStatus < 1 ? (
                                <ClockCircleOutlined/>
                            ) : rideStatus === 1 ? (
                                <LoadingOutlined/>
                            ) : (
                                <CheckCircleOutlined/>
                            )
                        }
                    />
                    <Step
                        status={
                            rideStatus < 2 ? "wait" : rideStatus === 2 ? "process" : "finish"
                        }
                        title={`Ride Completed ${rideStatus === 2 ? "(" + rideDetails.progress + ")" : ""}`}
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
                <Row>
                    <Col>Charge: </Col>
                    <Col>{rideDetails.charges === -1 ? 'Trip in progress' : '$' + Math.round(rideDetails.charges * 100) / 100}</Col>
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
                    <Col>Latest update: </Col>
                    <Col>{rideDetails.progress}</Col>
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
                    <Col>{`Distance remaining: ${rideStatus < 1 ? ' to pickup ' : 'to next destination'}`}</Col>
                    <Col>{rideStatus > 2 ? 0 : rideDetails.distance_remaining}</Col>
                </Row>
                <Row>
                    <Col>Collision: </Col>
                    <Col>{rideDetails.collision ? rideDetails.collision + ' at ' + rideDetails.collision_timestamp : 'n/a'}</Col>
                </Row>
                <Row>
                    <Col>Lane Invasion: </Col>
                    <Col>{rideDetails.lane ? rideDetails.lane + ' at ' + rideDetails.invasion_timestamp : 'n/a'}</Col>
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