const express = require('express');
const { createProductReview, getProductReviews, deleteProductReview, updateProductReview } = require('../controller/reviewController');
const router = express.Router();


router.post('/create-review/:productId', createProductReview);
router.get('/get-reviews/:productId', getProductReviews);
router.put('/update/:reviewId', updateProductReview)
router.delete('/delete/:reviewId', deleteProductReview);


module.exports = router;