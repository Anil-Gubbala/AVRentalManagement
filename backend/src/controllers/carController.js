const conn = require("../utils/dbConnector");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configuration");

const addCar = (req, res) => {
  let { number, model, make, color, build, status, capacity } =
    req.body.carDetails;

  let sql = "Select * from Cars where Cars.ownerId=? and regNumber=?";
  conn.query(sql, [req.user.email, number], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("car details present in DB - " + result);
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

module.exports = { addCar };
