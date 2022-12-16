const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");

router.post("/add", productController.addProduct);
router.get("/fetchproduct", productController.fetchProduct);
router.get("/list", productController.fetchProductPagination);
router.get("/retrieve/:uuid", productController.getProduct);
router.delete("/remove/:uuid", productController.removeProduct);

module.exports = router;
