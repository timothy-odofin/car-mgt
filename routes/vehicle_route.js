const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle_controller");

router.post("/verify/:vin", vehicleController.verifyVehicle);
router.post("/add", vehicleController.addVehicle);
router.get("/list", vehicleController.getAllVehicle);
router.patch("/update/:uuid", vehicleController.vehicleUpdate);
router.get("/retrieve/:uuid", vehicleController.getVehicle);
router.get("/list/by-owner/:ownerId", vehicleController.getAllVehicleByOwner);
router.delete("/remove/:uuid", vehicleController.removeVehicle);

module.exports = router;
