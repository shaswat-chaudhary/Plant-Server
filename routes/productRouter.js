const express = require('express');
const router = express.Router();

const { createProduct, getProductById, getProducts, searchProduct } = require('../controller/productController');

router.post('/addproduct', createProduct);
router.get('/getproducts', getProducts);
router.get('/getproducts/:id', getProductById);
router.get('/search', searchProduct);

module.exports = router;
