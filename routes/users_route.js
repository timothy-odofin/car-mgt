const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

// Start of User Endpoint
router.get("/fetch/:serviceType", userController.listUserByService);
router.get("/fetch", userController.getAllUsers);
router.get("/rating", userController.getAllRating);
router.get("/retrieve/:uuid", userController.getUser);
router.get("/list", userController.fetchByPagination);
router.put("/update/:uuid", userController.updateUser);
router.put("/update/:uuid", userController.updateServiceList);
router.post("/rating/add", userController.addRating);
router.put("/photograph/upload/:uuid", userController.uploadPhoto);
// router.get("/searchaddress/:address", userController.listUserByAddress);
router.get("/search", userController.listUsersByAddressOrServiceType);

module.exports = router;
