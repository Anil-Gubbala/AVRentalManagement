const { SECRET } = require("../../configuration");
const conn = require("../utils/dbConnector");
const jwt = require("jsonwebtoken");
const spawn = require("child_process").spawn;
const { v4 } = require("uuid");
const { db } = require("../Database/mongo/mongo");

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

const getUserRides = (req, res) => {
  const query = { user_id: req.user.email };
  const rides = Promise.all([
    db
      .collection("trips")
      .find(query)
      .map((item) => {
        return {
          id: item.trip_id,
          userId: item.user_id,
          source: item.source,
          destination: item.destination,
          carId: item.car_id,
          startTime: item.start_time,
          status: item.status,
        };
      })
      .next(),
  ]);
  rides
    .then((r) => {
      res.send(r);
    })
    .catch((err) => {
      res.status(500).send("Error occured");
    });

  // let sql = `Select *
  // from RideHistory
  // where userId = ?`;
  //   conn.query(sql, [req.user.email], (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log(result);
  //     res.send(result);
  //   });
};

const getRideDetails = (req, res) => {
  const rideId = req.query.id;

  const query = { trip_id: rideId };
  const rides = Promise.all([
    db
      .collection("trips")
      .find(query)
      .map((item) => {
        return {
          id: item.trip_id,
          userId: item.user_id,
          source: item.source,
          destination: item.destination,
          carId: item.car_id,
          startTime: item.start_time,
          status: item.status,
        };
      })
      .next(),
  ]);
  rides
    .then((r) => {
      res.send(r);
    })
    .catch((err) => {
      res.status(500).send("Error occured");
    });

  //   let sql = `Select *
  //                from RideHistory
  //                where userId = ?
  //                  and RideHistory.id = ?`;
  //   conn.query(sql, [req.user.email, rideId], (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log(result);
  //     res.send(result);
  //   });
};

const startRide = async (req, res) => {
    console.log(req.body)
    let {carId, source, destination, make, model, color} = req.body;
    try {
        // Get trip info to give to python script
        // must match blueprint: https://carla.readthedocs.io/en/latest/bp_library/#vehicle
        // Example: vehicle.chevrolet.impala
        let userCar = "vehicle." + make + "." + model
        let argFilter = '--filter=' + userCar
        // Pass in city string to change simulator starting coordinates
        let pickup = '--source=' + capitalizeLocationName(source)
        // Pass in city string to change simulator ending coordinates
        let dest = '--dest=' + capitalizeLocationName(destination)
        // Pass in color to use when creating the car
        let colorArg = '--color=' + color;
        let tripId = v4();
        let argTrip = '--trip_id=' + tripId;
        console.log(argFilter, pickup, dest, argTrip);

        const pythonProcess = spawn('python', ['C:\\Users\\poona\\IdeaProjects\\AVRentalManagement\\carla\\av_rental_client.py', argFilter, pickup, dest, argTrip, colorArg, "--write_to_db=True", "--recording=True", "--recording_frequency=1"]);

        pythonProcess.stdout.on('data', (data) => {
            // insert contents of file into collection as JSON object
            console.log(`stdout: ${data}`)

        });
        pythonProcess.stderr.on('data', data => {
            console.error(`stderr: ${data}`);
        });

        await db.collection("trips").insertOne({
            trip_id: tripId,
            car_id: carId,
            status: "active",
            start_time: new Date(),
            user_id: req.user.email,
            source: source,
            destination: destination
        });

        return res.send(200, {message: 'spawned python process, check logs', tripId: tripId});
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error while starting trip')
    }
};


const trackRide = async function (req, res) {
    let id = req.params.id

    console.log("ID " + id);
    const query = {trip_id: id};
    Promise.all([
        db.collection("trips").findOne(query),
        db.collection("gnssDetails").find(query)
            .sort({timestamp: -1})
            .limit(1)
            .map((item) => {
                // console.log("GNSS " + item);
                return {
                    trip_id: item.trip_id,
                    distance_remaining: item.distance_to_dest,
                    x_coord: item.x || 'n/a',
                    y_coord: item.y || 'n/a',
                    latitude: item.latitude || 'n/a',
                    longitude: item.longitude || 'n/a',
                    timestamp: item.timestamp || 'n/a'
                };
            }).next(),
        db.collection("cameraDetails").find(query)
            .sort({timestamp: -1})
            .limit(1)
            .map((item) => {
                // console.log(item)
                return {camera_url: item.url || ''}
            }).next(),
        db.collection("connectionDetails").find(query)
            .sort({timestamp: -1})
            .limit(1)
            .map((item) => {
                return {
                    trip_status: item.connection_status || 'inactive'
                }
            }).next()
    ])
        .then((r) => {
            let result = {}
            for (const v of r.values()) {
                result = {...result, ...v}
            }
            res.send(result);
        })
        .catch(err => {
            console.error(`Failed to find latest trip documents: ${err}`);
            res.status(500).send("Error occured")
        });
}


// capitalize first letter of each word in location to match carla script expected args
function capitalizeLocationName(text) {
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}

module.exports = { startRide, trackRide, getUserRides, getRideDetails };