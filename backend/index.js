const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const router = require("./src/router");
const db = require("./src/utils/dbConnector");
const { CONFIG } = require("./configuration");
const passport = require("passport");
const { auth } = require("./src/utils/auth");
const { sendMail } = require("./src/utils/mail");

const app = express();

app.use(
  cors({
    origin: [CONFIG.FRONTEND], // add to constants file or configuration file.
    // origin: '*',
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

sendMail({
  to: "anil08.nani@gmail.com",
  subject: 'Server started',
  text: 'hello'
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/", router);
auth();

if (!module.parent) {
  app.listen(CONFIG.BACKEND_PORT, () => {
    console.log("running Node server");
  });
}

module.exports = app;
