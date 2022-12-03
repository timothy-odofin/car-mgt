const express = require("express");
const router = express.Router();
const entranceController = require("../controllers/entrance_controller");

router.post("/signup", entranceController.signupUser);
router.post("/login", entranceController.loginUser);
router.post("/activate", entranceController.activateUser);
router.post("/password/change", entranceController.changePassword);
router.post("/password/forgot", entranceController.forgotPassword);
router.post("/send-otp", entranceController.sendOtpToUser);

module.exports = router;
