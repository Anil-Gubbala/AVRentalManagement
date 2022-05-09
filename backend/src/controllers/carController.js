const conn = require("../utils/dbConnector");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../../configuration");
const {db} = require("../Database/mongo/mongo");

const sendError = (res, status, code) => {
    res.status(status).send({err: code});
};

const addCar = (req, res) => {
    let {number, model, make, color, build, status, capacity} =
        req.body.carDetails;

    let sql = "Select * from Cars where Cars.ownerId=? and regNumber=?";
    conn.query(sql, [req.user.email, number], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("car details present in DB - " + result);
        if (result.length > 0) sendError(res, 404, err.code);
        if (result.length === 0)
            sql =
                "INSERT into Cars (ownerId,regNumber,model,make,color,build,status,capacity) values (?,?,?,?,?,?,?,?) ";
        conn.query(
            sql,
            [req.user.email, number, model, make, color, build, status, capacity],
            (err, result) => {
                if (err) {
                    console.log(err);
                    response.error(res, 500, err.code);
                    return;
                }
                res.send(result);
            }
        );
    });
};

const getOwnerCars = (req, res) => {
    let sql = "Select * from Cars where Cars.ownerId=?";
    conn.query(sql, [req.user.email], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(result);
        res.send(result);
    });
};

const updateCar = (req, res) => {
    let {number, model, make, color, build, status, capacity} =
        req.body.carDetails;
    let sql =
        "Update Cars set model=?,make=?,color=?,build=?,status=?,capacity=? where regNumber=?";
    conn.query(
        sql,
        [model, make, color, build, status, capacity, number],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.send(result);
        }
    );
};

const getCar = (req, res) => {
    console.log(req.query[0]);
    let sql = "Select * from Cars where Cars.ownerId=? and Cars.regNumber=?";
    conn.query(sql, [req.user.email, req.query[0]], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(result);
        res.send(result[0]);
    });
};

const getAvailableCars = async (req, res) => {
    console.log(req.query[0]);
    const activeCarId = await db
        .collection("trips")
        .find({trip_status: {$in: ["active", "pickedup", "pickup"]}})
        .map((t) => t.carId)
        .toArray();
    let sql = "Select * from Cars where Cars.id NOT IN (?) AND Cars.status=?";
    conn.query(sql, [activeCarId.join(","), "Active"], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(result);
        res.send(result);
    });
};

const getOwnerCarRides = (req, res) => {
    let carIdList = [];
    let carIdModel = [];
    let sql = "Select id,model from Cars where Cars.ownerId=? ";
    conn.query(sql, [req.user.email], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        carIdList = result.map((r) => r.id.toString());
        console.log(carIdList);
        carIdModel = result;

        const query = {car_id: {$in: [...carIdList]}};
        const rides = Promise.all([
            db
                .collection("trips")
                .find(query)
                .toArray(function (err, result) {
                    if (err) throw err;
                    else {
                        res.send({
                            carIds: carIdModel,
                            rides: result.map((item) => {
                                return {
                                    id: item.trip_id,
                                    userId: item.user_id,
                                    source: item.source,
                                    destination: item.destination,
                                    carId: item.car_id,
                                    startTime: item.start_time,
                                    status: item.status,
                                };
                            }),
                        });
                    }
                }),
        ]);
    });
};

const getCarRides = (req, res) => {
    console.log("Inserver-paramValue" + req.query[0]);
    const query = {car_id: req.query[0]};

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
    // console.log(req.query[0]);
    // let sql = `Select *
    //            from RideHistory r
    //                     inner join User u on r.userid = u.email
    //                     inner join Cars c on r.carid = c.id
    //                     inner join Bill b on r.id = b.rideId
    //            where r.carId = ?`;
    // conn.query(sql, [req.query[0]], (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(result);
    //     res.send(result[0]);
    // });
};

module.exports = {
    addCar,
    getOwnerCars,
    getCar,
    getCarRides,
    getAvailableCars,
    updateCar,
    getOwnerCarRides,
};
