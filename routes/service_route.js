const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service_controller");

// Service  API
router.post("request_service", serviceController.serviceRequest);
router.post("add_service_cost", serviceController.addServiceCost);
router.get("/fetch_all_service", serviceController.fetchAllService);
router.patch("edit_service_cost/:uuid", serviceController.editServiceCost);
router.get(
  "fetch_service_by_provider/:uuid",
  serviceController.fetchByServiceProvider
);
router.get("fetch_service_by_owner/:ownerid", serviceController.fetchByOwnerId);
router.get("fetch_all_pagination", serviceController.fetchByPagination);

// Service Log API
router.post("add_service_log", serviceController.addServiceLog);
router.get("fetch_service/:uuid", serviceController.fetchService);
router.get("/fetch_servicelog", serviceController.fetchAllServiceLog);
module.exports = router;
