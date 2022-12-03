const express = require('express');
const router = express.Router()
const insuranceControlller = require('../controllers/insurance_controller')


router.post('/add', insuranceControlller.addInsurance)
router.get('/edit', insuranceControlller.editAllInsurance);
router.get('/retrieve/:uuid', insuranceControlller.singleInsurance);


module.exports = router