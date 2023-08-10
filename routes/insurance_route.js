const express = require("express");
const router = express.Router();
const insuranceControlller = require("../controllers/insurance_controller");

router.post("/add", insuranceControlller.addInsurance);
router.get("/edit", insuranceControlller.getAllInsurance);
router.get("/retrieve/:uuid", insuranceControlller.singleInsurance);
router.delete("/remove/:uuid", insuranceControlller.removeInsurance);

// Insurance-company Apis
router.post("/addinsure", insuranceControlller.addInsuranceCompany);
router.get("/list", insuranceControlller.listAllInsuranceCompany);
router.get(
  "/retrieveinsure/:uuid",
  insuranceControlller.singleInsuranceCompany
);
router.delete(
  "/removeinsurancecomp/:uuid",
  insuranceControlller.removeInsuranceCompany
);
router.get("/list/vehicle/use", insuranceControlller.vehicleTypes);

module.exports = router;
