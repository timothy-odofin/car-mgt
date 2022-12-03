const express = require('express');
const router = express.Router()
const settingController = require('../controllers/setting_Controller')


router.get('/list/:stateName', settingController.getLga)
router.get('/edit', settingController.carDetails);
router.get('/retrieve/:category', settingController.getCategoryList);


module.exports = router
