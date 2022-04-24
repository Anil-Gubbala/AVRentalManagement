const conn = require("../utils/dbConnector");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configuration");
const saltRounds = 10;

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

const getLogin = (req, res) => {
  if (req.user) {
    res.send({ loggedIn: true, user: req.user });
  } else {
    res.send({ loggedIn: false });
  }
};
const signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  conn.query(
    "SELECT password FROM User WHERE email = ? and role=?;",
    [email, role],
    (err, result) => {
      if (err) return;
      else if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const userInfo = {
              email: email,
              role: role,
            };
            const token = jwt.sign(userInfo, SECRET, {
              expiresIn: 1008000,
            });
            res.status(200).send({ token: `JWT ${token}`, user: userInfo });
          } else {
            res.status(500).send({ err: "Incorrect Password" });
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
    firstName,
    lastName,
    address,
    city,
    state,
    country,
    zipcode,
    phone,
    gender,
    password,
    email,
    role,
  } = req.body.userDetails;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    } else {
      var sql =
        "INSERT INTO User ( firstName, lastName, address,city,state,country,zipcode,phone,gender, password,email,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      conn.query(
        sql,
        [
          firstName,
          lastName,
          address,
          city,
          state,
          country,
          zipcode,
          phone,
          gender,
          hash,
          email,
          role,
        ],
        (err, result) => {
          if (err) {
            sendError(res, 404, err.code);
          } else {
            res.status(200).send({ success: true });
          }
        }
      );
    }
  });
};

const updateProfile = (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    country,
    zipcode,
    phone,
    gender,
  } = req.body.userDetails;
  const email = req.user.email;
  var sql =
    "UPDATE User SET firstName = ?, lastName = ?,address =? ,city =? , state =? ,country=?, zipcode =?, phone =?, gender =? WHERE email = ?;";
  conn.query(
    sql,
    [
      firstName,
      lastName,
      address,
      city,
      state,
      country,
      zipcode,
      phone,
      gender,
      email,
    ],
    (err, result) => {
      if (err) {
        sendError(res, 500, err.code);
      }
      res.send();
    }
  );
};

const getProfile = (req, res) => {
  const email = req.user.email;
  conn.query("select * from User where email = ?", [email], (err, result) => {
    if (err) {
      sendError(res, 500, err.code);
      return;
    }
    res.send(result[0]);
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

module.exports = {
  signin,
  registerUser,
  signout,
  getLogin,
  getProfile,
  updateProfile,
};
