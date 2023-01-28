const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service_controller");

// Service  Routes
router.post("/new", serviceController.serviceRequest);
router.post("/update/:uuid", serviceController.updateServiceCost);
router.get("/fetch", serviceController.fetchAllService);
router.get("/fetch/provider/:uuid", serviceController.fetchByServiceProvider);
router.get("/fetch/car/:vehicleId", serviceController.fetchByCarID);
router.get("/fetch/filter/:uuid", serviceController.filterALlService);
router.get("/fetch/owner/:ownerId", serviceController.fetchByOwnerId);

// Service_Log Routes
router.post("/conversation/add/:serviceId", serviceController.addServiceLog);
router.delete(
  "/conversation/delete/:uuid",
  serviceController.deleteServiceConversation
);
router.get(
  "/conversation/list/:serviceId",
  serviceController.listServiceConversationByServiceId
);

// Service_Item Routes
router.post("/item/add/:serviceId", serviceController.addItem);
router.get("/item/list/:serviceId", serviceController.listItem);
router.delete("/item/delete/:serviceId", serviceController.deleteServiceItem);
module.exports = router;
