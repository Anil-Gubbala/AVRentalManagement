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
  updateProfile,
} = require("./controllers/accountController");
const {
  addCar,
  getOwnerCars,
  getCar,
  getCarRides,
  getAvailableCars,
} = require("./controllers/carController");

const {
  getUsersAdmin,
  getCarsAdmin,
  updateStatus,
  getTripDetails,
  getRides,
} = require("./controllers/adminController");
const {
  startRide,
  trackRide,
  getUserRides,
  getRideDetails,
} = require("./controllers/ridesController");
const {
  createInvoice,
  getInvoiceDetails,
} = require("./controllers/billController");

const router = express.Router();

// demo for auth calls
router.route("/demoCall").post(checkAuth, demoCall);

// Need to add checkAuth if login is required for your functions to work.
router.route("/signin").get(signin);
router.route("/user").post(registerUser);
router.route("/getLogin").get(checkAuth, getLogin);
router.route("/signout").get(checkAuth, signout);

router.route("/getUsersAdmin").get(getUsersAdmin);
router.route("/getCarsAdmin").get(getCarsAdmin);
router.route("/getRides").get(getRides);
router.route("/updateStatus").post(updateStatus);
router.route("/getTripDetails").get(getTripDetails);
router.route("/profile").get(checkAuth, getProfile);
router.route("/profile").put(checkAuth, updateProfile);
router.route("/user").get(checkAuth, getProfile);
router.route("/user").put(checkAuth, updateProfile);
router.route("/addcar").post(checkAuth, addCar);
router.route("/getownercars").get(checkAuth, getOwnerCars);
router.route("/getcar").get(checkAuth, getCar);
router.route("/getcarrides").get(checkAuth, getCarRides);
router.route("/getAvailableCars").get(getAvailableCars);
router.route("/getuserrides").get(checkAuth, getUserRides);

router.route("/getRideDetails").get(checkAuth, getRideDetails);
router.route("/bill").post(checkAuth, createInvoice);
router.route("/bill").get(checkAuth, getInvoiceDetails);

router.route("/startRide").post(checkAuth, startRide);
router.route("/trackRide/:id").get(trackRide);

module.exports = router;
