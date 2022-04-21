const conn = require("../utils/dbConnector");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configuration");
const saltRounds = 10;

const getLogin = (req, res) => {
  if (req.user) {
    res.send({ loggedIn: true, user: req.user });
  } else {
    res.send({ loggedIn: false });
  }
};
const signin = (req, res) => {
  console.log("Entered");
  const emailid = req.body.emailid;
  const password = req.body.password;
  conn.query(
    "SELECT * FROM Customer WHERE emailid = ?;",
    emailid,
    (err, result) => {
      if (err) return;
      else if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const userInfo = {
              email_id: emailid,
              customer_id: result[0].customer_id,
              isAdmin: result[0].role === "admin",
            };
            const token = jwt.sign(userInfo, SECRET, {
              expiresIn: 1008000,
            });
            res.status(200).send({ token: `JWT ${token}`, user: userInfo });
          } else {
            res.writeHead(401, {
              "Content-Type": "text/plain",
            });
            res.end("UnSuccessful Login");
          }
        });
      } else {
        res.status(404).send({ err: "User doesn't exist" });
      }
    }
  );
};

const registerUser = (req, res) => {
  const {
    customer_first_name,
    customer_last_name,
    address,
    city,
    state,
    zip_code,
    passportid,
    gender,
    password,
    emailid,
    role,
    sec_ques,
    sec_ans,
  } = req.body.userDetails;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    } else {
      var mileage_number = `${passportid}` + "T62954";
      var sql =
        "INSERT INTO Customer ( customer_first_name, customer_last_name, address,city,state,zip_code,passportid,gender, password,emailid,role,sec_ques,sec_ans,mileage_plus_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      conn.query(
        sql,
        [
          customer_first_name,
          customer_last_name,
          address,
          city,
          state,
          zip_code,
          passportid,
          gender,
          hash,
          emailid,
          role,
          sec_ques,
          sec_ans,
          mileage_number,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            throw err;
          }
          const data = {
            emailid: emailid,
            mileage_number: mileage_number,
          };
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end(JSON.stringify(data));
        }
      );
    }
  });
};

const signout = (req, res) => {
  if (req.user) {
    req.logout();
    res.send();
  } else {
    res.send();
  }
};

module.exports = { signin, registerUser, signout, getLogin };
