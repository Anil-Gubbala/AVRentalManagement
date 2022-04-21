const express = require("express");
const { checkAuth } = require("./utils/auth");

//import controller.
const { demoCall } = require("./controllers/demoController");
const {
  signin,
  registerUser,
  getLogin,
  signout,
} = require("./controllers/accountController");

const router = express.Router();

// demo for auth calls
router.route("/demoCall").post(checkAuth, demoCall);

// demo for without auth calls
router.route("/signinData").post(signin);
router.route("/register").post(registerUser);

module.exports = router;
