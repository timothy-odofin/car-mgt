const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

// Start of User Endpoint
router.get("/fetch/:serviceType", userController.listUserByService);
router.get("/fetch", userController.getAllUsers);
router.get("/retrieve/:uuid", userController.getUser);
router.get("/list", userController.fetchByPagination);
router.put("/update/:uuid", userController.updateUser);

module.exports = router;
