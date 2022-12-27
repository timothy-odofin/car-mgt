const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service_controller");

// Service  API
router.post("/new", serviceController.serviceRequest);
router.post("/update", serviceController.serviceRequest);
router.post("/cost/add/:uuid", serviceController.addServiceCost);
router.get("/fetch", serviceController.fetchAllService);
router.patch("/cost/edit/:uuid", serviceController.editServiceCost);
router.get("/fetch/provider/:uuid", serviceController.fetchByServiceProvider);
router.get("/fetch/owner/:ownerid", serviceController.fetchByOwnerId);
router.get("/fetch/pagination", serviceController.fetchByPagination);

// Service Log API
router.post("/log", serviceController.addServiceLog);
router.get("/fetch/service/:uuid", serviceController.fetchService);
router.get("/fetch/all", serviceController.fetchAllServiceLog);
module.exports = router;
