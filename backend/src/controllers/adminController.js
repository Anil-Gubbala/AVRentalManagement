const conn = require("../utils/dbConnector");
const SQL_ADMIN = require("../Database/queries/admin")


const getUsersAdmin = (req, res) => {
    conn.query("select * from User where role = 0",  (err, result) => {
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

module.exports = { getUsersAdmin, getCarsAdmin };