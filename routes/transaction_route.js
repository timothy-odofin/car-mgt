const express = require('express');
const router = express.Router()
const transactionController = require('../controllers/transaction_controller')


router.post('/add', transactionController.createTrans)
router.put('/update/:uuid', transactionController.updateTrans)
router.get('/retrievesingle/:uuid', transactionController.getSingleTrans);



module.exports = router
