const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle_controller");

router.post("/add", vehicleController.addVehicle);
router.get("/list", vehicleController.getAllVehicle);
router.put("/update/:uuid", vehicleController.vehicleUpdate);
router.get("/retrievesingle/:uuid", vehicleController.getVehicle);
router.delete("/remove/:uuid", vehicleController.removeVehicle);

module.exports = router;
