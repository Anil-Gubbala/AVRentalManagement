const mysql = require("mysql");
const { MYSQL } = require("../../configuration");

const connector = mysql.createPool({
  user: MYSQL.USER,
  host: MYSQL.HOST,
  password: MYSQL.PASSWORD,
  database: MYSQL.DATABASE,
  port: MYSQL.PORT,
  multipleStatements: true,
});

const db = {
  query: (query, values, callback) => {
    connector.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      return callback(null, result);
    });
  },
};

module.exports = db;
// Usage: import db, then use db.query to query database
