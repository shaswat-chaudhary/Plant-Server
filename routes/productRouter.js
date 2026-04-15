const express = require('express');
const router = express.Router();

const { createProduct, getProductById, getProducts, searchProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { authorize } = require('../middleware/authMiddle');

router.get('/getproducts', getProducts);
router.get('/getproduct/:id', getProductById);

router.post('/addproduct', authorize('admin'), createProduct);
router.put('/getproduct/:id', authorize, updateProduct);
router.delete('/delete-product/:id', authorize,  deleteProduct);

router.get('/pages/search', searchProduct);

module.exports = router;
