const express = require('express');
const router = express.Router()
const productController = require('../controllers/product_controller');


router.post('/add', productController.addProduct)
router.delete('/remove/:uuid', productController.removeProduct)
router.get('/edit', productController.editAllProduct);
router.get('/list', productController.fetchProductPagination)
router.get('/retrieve/:uuid', productController.getProduct);




module.exports = router