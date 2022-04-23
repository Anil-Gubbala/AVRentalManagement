const express = require("express");
const { checkAuth } = require("./utils/auth");

//import controller.
const { demoCall } = require("./controllers/demoController");
const {
  signin,
  registerUser,
  getLogin,
  signout,
  getProfile,
} = require("./controllers/accountController");

const router = express.Router();

// demo for auth calls
router.route("/demoCall").post(checkAuth, demoCall);

// Need to add checkAuth if login is required for your functions to work.
router.route("/signinData").post(signin);
router.route("/register").post(registerUser);
router.route("/getLogin").get(checkAuth, getLogin);
router.route("/signout").get(checkAuth, signout);

router.route("/getProfile").get(checkAuth, getProfile);

module.exports = router;
