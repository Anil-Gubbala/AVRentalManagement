const { SECRET } = require("../../configuration");
const conn = require("../utils/dbConnector");
const jwt = require("jsonwebtoken");
const spawn = require("child_process").spawn;
const { v4 } = require("uuid");
const { db } = require("../Database/mongo/mongo");

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

const getInvoiceDetails = (req, res) => {
  const rideId = req.query.id;
  let sql = `Select * from Bill  where rideId = ?`;
  conn.query(sql, [rideId], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result[0]);
  });
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(1, 6);

const createInvoice = (req, res) => {
  const rideId = req.query.id;

  // based on time or distance calculate base fare
  // based on model add 10% to the bill
  // tax will be 10% of the bill

  //Fetch ride time or distance.
  const time = rndInt(100, 1000);
  var amount = time / 10;

  // Fetch car model and increase fare
  const model = "SUV";
  if (model === "SUV") {
    amount = amount + amount * 0.1;
  }

  const tax = amount * 0.1;
  const total = amount + tax;

  // fetch card details from user account.
  const card = 1234;

  let sql = `Insert into bill (rideId, tax, amount, card, total) values (?,?,?,?,?)`;

  conn.query(sql, [rideId, tax, amount, total, card], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
};

module.exports = { getInvoiceDetails, createInvoice };
