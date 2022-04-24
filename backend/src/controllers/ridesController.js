const conn = require("../utils/dbConnector");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configuration");

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

const getUserRides = (req, res) => {
  let sql = `Select * from RideHistory where userId=?`;
  conn.query(sql, [req.user.email], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
};

const getRideDetails = (req, res) => {
  const rideId = req.query.id;
  let sql = `Select * from RideHistory where userId=? and RideHistory.id=?`;
  conn.query(sql, [req.user.email, rideId], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
};

module.exports = { getUserRides, getRideDetails };
