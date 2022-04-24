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
        console.log(result);
        res.send(result);
    });
};

const getCar = (req, res) => {
    console.log(req.query[0]);
    let sql = "Select * from Cars where Cars.ownerId=? and Cars.regNumber=?";
    conn.query(sql, [req.user.email, req.query[0]], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.send(result[0]);
    });
};

const getAvailableCars = async (req, res) => {
    console.log(req.query[0]);
    const activeCarId = await db.collection("trips").find({trip_status: "active"}).map((t) => t.carId).toArray();
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

const getCarRides = (req, res) => {
    console.log(req.query[0]);
    let sql = `Select *
               from RideHistory r
                        inner join User u on r.userid = u.email
                        inner join Cars c on r.carid = c.id
                        inner join Bill b on r.id = b.rideId
               where r.carId = ?`;
    conn.query(sql, [req.query[0]], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.send(result[0]);
    });
};

module.exports = {addCar, getOwnerCars, getCar, getCarRides, getAvailableCars};
