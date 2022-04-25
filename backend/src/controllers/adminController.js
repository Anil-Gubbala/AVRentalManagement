const conn = require("../utils/dbConnector");
const SQL_ADMIN = require("../Database/queries/admin")
const {db} = require("../Database/mongo/mongo");

const getUsersAdmin = (req, res) => {
    conn.query("select * from User",  (err, result) => {
      if (err) {
        sendError(res, 500, err.code);
        return;
      }
      console.log(result);
      res.send(result);
    });
  };

  const getCarsAdmin = (req, res) => {
    conn.query("select * from Cars",  (err, result) => {
      if (err) {
        sendError(res, 500, err.code);
        return;
      }
      res.send(result);
    });
  };

  const getTripDetails = (req, res) => {
    console.log(db.collection("trips").find());
  };

  const updateStatus = (req, res) => {
    console.log(req.body);
    console.log("Entered");
    // console.log(req.body);
    conn.query(
      "Update Cars set status = ?  where id = ?",
      [req.body.status, req.body.id],
      (error, result) => {
        if (error) {
          res.status(404).send({ err: error.code });
        } else if (result.length == 0) {
          res.send([]);
        } else {
          // console.log(query);
          res.send(result);
        }
      }
    );
  };

module.exports = { getUsersAdmin, getCarsAdmin, updateStatus, getTripDetails };