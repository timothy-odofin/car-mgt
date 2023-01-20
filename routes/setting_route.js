const express = require("express");
const router = express.Router();
const settingController = require("../controllers/setting_Controller");

router.get("/list/:stateName", settingController.getLga);
router.get("/edit", settingController.carDetails);
router.get("/retrieve/:category", settingController.getCategoryList);
router.get("/about/us", settingController.aboutUsDetails);
router.get("/service/type", settingController.serviceTypesDetails);

module.exports = router;
