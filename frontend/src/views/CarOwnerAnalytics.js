import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { useDispatch } from "react-redux";
import { REDUCER } from "../utils/consts";
import { get } from "../utils/serverCall";
import { MDBContainer } from "mdbreact";
import { Bar, Pie } from "react-chartjs-2";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import { Tabs, Radio } from "antd";
const { TabPane } = Tabs;

const CarOwnerAnalytics = () => {
  const dispatch = useDispatch();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const role = localStorage.getItem(REDUCER.ROLE);
  const [redirToCarHome, setRedirToCarHome] = useState(false);
  const [carModels, setCarModels] = useState([]);
  const [carBuilds, setCarBuilds] = useState([]);

  const [pieData, setPieData] = useState({
    datasets: [{}],
  });

  const [barBuildData, setBarBuildData] = useState({
    datasets: [{}],
  });

  const [pieStatusData, setpieStatusData] = useState({
    datasets: [{}],
  });

  const [barSource, setBarSource] = useState({
    datasets: [{}],
  });
  // if (role !== "1") {
  //   return <Navigate to={redirectHome()} />;
  // }

  const getCarRideDetails = () => {
    get(`/getownerrides`)
      .then((response) => {
        console.log(response);

        // let makesSubCat = {};
        // for (let car of response.carIds) {
        //   if (!makesSubCat[car.make]) {
        //     makesSubCat[car.make] = [car.id];
        //   } else makesSubCat[car.make].push(car.id);
        // }
        // console.log(makesSubCat);
        // // subCatCount = {};
        // for (let make of makesSubCat) {
        //   // subCatCount = response.rides.filter((e)=>make)
        //   console.log(make);
        // }

        let sourceSubCat = {};
        for (let car of response.rides) {
          if (!sourceSubCat[car.source]) sourceSubCat[car.source] = 1;
          else sourceSubCat[car.source] = sourceSubCat[car.source] + 1;
        }

        setBarSource({
          labels: Object.keys(sourceSubCat).map(
            (label, index) => `${label}: ${Object.values(sourceSubCat)[index]}`
          ),
          datasets: [
            {
              label: "Distribution by Origin of ride",
              backgroundColor: [
                "rgb(25, 35, 46)",
                "rgb(75, 205, 86)",
                "rgb(105, 0, 86)",
                "rgb(10, 200, 150)",
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(255, 05, 16)",
                "rgb(255, 45, 196)",
                "rgb(184, 162, 235)",
                "rgb(5, 95, 0)",
                "rgb(145, 145, 16)",
                "rgb(80, 10, 6)",
              ],
              data: Object.values(sourceSubCat),
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCarDetails = () => {
    get(`/getownercars`)
      .then((response) => {
        // console.log(response);
        let carSubCat = {};
        let carBuildSubCat = {};
        let carStatusSubCat = {};
        for (let car of response) {
          if (!carSubCat[car.make]) carSubCat[car.make] = 1;
          else carSubCat[car.make] = carSubCat[car.make] + 1;
          if (!carBuildSubCat[car.build]) carBuildSubCat[car.build] = 1;
          else carBuildSubCat[car.build] = carBuildSubCat[car.build] + 1;
          if (!carStatusSubCat[car.status]) carStatusSubCat[car.status] = 1;
          else carStatusSubCat[car.status] = carStatusSubCat[car.status] + 1;
        }
        // console.log(Object.keys(carSubCat));
        setCarModels(carSubCat);
        setCarBuilds(carBuildSubCat);
        setPieData({
          labels: Object.keys(carSubCat).map(
            (label, index) => `${label}: ${Object.values(carSubCat)[index]}`
          ),
          datasets: [
            {
              label: "Distribution by Car make",
              backgroundColor: [
                "rgb(25, 35, 46)",
                "rgb(75, 205, 86)",
                "rgb(105, 0, 86)",
                "rgb(10, 200, 150)",
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(255, 05, 16)",
                "rgb(255, 45, 196)",
                "rgb(184, 162, 235)",
                "rgb(5, 95, 0)",
                "rgb(145, 145, 16)",
                "rgb(80, 10, 6)",
              ],
              data: Object.values(carSubCat),
            },
          ],
        });
        setBarBuildData({
          labels: Object.keys(carBuildSubCat).map(
            (label, index) =>
              `${label}: ${Object.values(carBuildSubCat)[index]}`
          ),
          datasets: [
            {
              label: "Distribution by Car build",
              backgroundColor: [
                "rgb(25, 35, 46)",
                "rgb(75, 205, 86)",
                "rgb(105, 0, 86)",
                "rgb(10, 200, 150)",
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(255, 05, 16)",
                "rgb(255, 45, 196)",
                "rgb(184, 162, 235)",
                "rgb(5, 95, 0)",
                "rgb(145, 145, 16)",
                "rgb(80, 10, 6)",
              ],
              data: Object.values(carBuildSubCat),
            },
          ],
        });
        setpieStatusData({
          labels: Object.keys(carStatusSubCat).map(
            (label, index) =>
              `${label}: ${Object.values(carStatusSubCat)[index]}`
          ),
          datasets: [
            {
              label: "Distribution by Car build",
              backgroundColor: [
                "rgb(25, 35, 46)",
                "rgb(75, 205, 86)",
                "rgb(105, 0, 86)",
                "rgb(10, 200, 150)",
              ],
              data: Object.values(carStatusSubCat),
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarDetails();
    getCarRideDetails();
  }, []);

  const Back = (event) => {
    event.preventDefault();
    setRedirToCarHome(true);
  };
  let ad = null;
  if (redirToCarHome) ad = <Navigate to="/carownerhome" />;
  return (
    <>
      {ad}
      <div style={{ marginTop: "20px" }}>
        <h2 className="mb-4 text-center">Analytics</h2>
      </div>
      <Container
        style={{
          boxShadow: "0 0 8px black",
          padding: "25px",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <div style={{ margin: "20px", textAlign: "right" }}>
          <Button
            type="submit"
            onClick={Back}
            variant="dark"
            style={{ marginBottom: "8px", marginLeft: "20px" }}
          >
            Go Back
          </Button>
        </div>

        <>
          <Tabs defaultActiveKey="1" type="card" size="large">
            <TabPane
              style={{ margintop: "5%" }}
              tab="Cars Distribution"
              key="1"
            >
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Make" key="1" style={{}}>
                  <div
                    style={{
                      height: "400px",
                      width: "800px",
                      marginTop: "5%",
                    }}
                  >
                    <MDBContainer>
                      <Bar
                        data={pieData}
                        options={{
                          legend: { display: true, position: "right" },

                          datalabels: {
                            display: true,
                            color: "white",
                          },
                          tooltips: {
                            backgroundColor: "#aa6e7f",
                          },
                        }}
                      />
                    </MDBContainer>
                  </div>
                </TabPane>
                <TabPane tab="Build" key="2">
                  <div
                    style={{
                      height: "400px",
                      width: "800px",
                      marginTop: "5%",
                    }}
                  >
                    <MDBContainer>
                      <Bar
                        data={barBuildData}
                        options={{
                          legend: { display: true, position: "right" },

                          datalabels: {
                            display: true,
                            color: "white",
                          },
                          tooltips: {
                            backgroundColor: "#aa6e7f",
                          },
                        }}
                      />
                    </MDBContainer>
                  </div>
                </TabPane>
                <TabPane tab="Status" key="3">
                  <div
                    style={{
                      height: "400px",
                      width: "400px",
                      marginTop: "5%",
                    }}
                  >
                    <MDBContainer>
                      <Pie
                        data={pieStatusData}
                        options={{
                          legend: { display: true, position: "right" },

                          datalabels: {
                            display: true,
                            color: "white",
                          },
                          tooltips: {
                            backgroundColor: "#aa6e7f",
                          },
                        }}
                      />
                    </MDBContainer>
                  </div>
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Rides Distribution" key="2">
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Location" key="1" style={{}}>
                  <div
                    style={{
                      height: "400px",
                      width: "800px",
                      marginTop: "5%",
                    }}
                  >
                    <MDBContainer>
                      <Bar
                        data={barSource}
                        options={{
                          legend: { display: true, position: "right" },

                          datalabels: {
                            display: true,
                            color: "white",
                          },
                          tooltips: {
                            backgroundColor: "#aa6e7f",
                          },
                        }}
                      />
                    </MDBContainer>
                  </div>
                </TabPane>
                {/* <TabPane tab="Make" key="2" style={{}}>
                  <div
                    style={{
                      height: "400px",
                      width: "800px",
                      marginTop: "5%",
                    }}
                  >
                    <MDBContainer>
                      <Bar
                        data={barSource}
                        options={{
                          legend: { display: true, position: "right" },

                          datalabels: {
                            display: true,
                            color: "white",
                          },
                          tooltips: {
                            backgroundColor: "#aa6e7f",
                          },
                        }}
                      />
                    </MDBContainer>
                  </div>
                </TabPane> */}
              </Tabs>
            </TabPane>
            {/* <TabPane tab="Monetary Distribution" key="3"></TabPane> */}
          </Tabs>
        </>
      </Container>
    </>
  );
};

export default CarOwnerAnalytics;
