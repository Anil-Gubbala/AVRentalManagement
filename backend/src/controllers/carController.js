const conn = require("../utils/dbConnector");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configuration");

const addCar = (req, res) => {
  let sql =
    "INSERT into Car (number,make,model,color,build,status,capacity) values (?,?,?,?,?,?,?) ";
  conn.query(sql, req.body, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.send();
  });
};

module.exports = { addCar };
