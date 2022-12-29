const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service_controller");

// Service  API
router.post("/new", serviceController.serviceRequest);
router.post("/update/:uuid", serviceController.updateServiceCost);
router.get("/fetch", serviceController.fetchAllService);
router.get(
    "/fetch/provider/:uuid",
    serviceController.fetchByServiceProvider
);

router.post(
    "/item/add/:serviceId",
    serviceController.addItem
);
router.get(
    "/item/list/:serviceId",
    serviceController.listItem
);
router.get(
    "/fetch/filter/:uuid",
    serviceController.filterALlService
);
router.get("/fetch/owner/:ownerId", serviceController.fetchByOwnerId);
// Service Log API
router.post("/conversation/add/:serviceId", serviceController.addServiceLog);
router.delete("/conversation/delete/:uuid", serviceController.deleteServiceConversation);
router.get("/conversation/list/:serviceId", serviceController.listServiceConversationByServiceId);
module.exports = router;
