const conn = require("../utils/dbConnector");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configuration");

const addCar = (req, res) => {
  console.log(req.body.carDetails);

  let { number, model, make, color, build, status, capacity } =
    req.body.carDetails;

  let sql =
    "INSERT into Cars (regNumber,model,make,color,build,status,capacity) values (?,?,?,?,?,?,?) ";
  conn.query(
    sql,
    [number, model, make, color, build, status, capacity],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.send();
    }
  );
};

module.exports = { addCar };
