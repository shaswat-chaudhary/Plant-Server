const Review = require('../models/ReviewModel');
const Product = require('../models/productModel');


const getProductReviews = async (req, res) => {
    const { productId } = req.params;
    const { sort = '-createdAt', page = 1, limit = 10, rating } = req.query;

    try {
        const reviews = await Review.find({ product: productId })
            .populate('product', 'images')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        if (!reviews) {
            return res.status(404).json({ message: "No reviews found" });
        }

        const totalReviews = await Review.countDocuments({ product: productId });
        const totalPages = Math.ceil(totalReviews / limit);
        const average = await Review.aggregate([
            { $match: { product: productId } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' }
                }
            }
        ]);

        res.json({
            reviews,
            totalReviews,
            totalPages,
            currentPage: page,
            average: average[0] ? average[0].averageRating : 0
        })


    } catch (error) {
        return res.status(500).json({ message: 'server error' });
    }
}

const createProductReview = async (req, res) => {

    try {
        const { rating, comment, title, images } = req.body;
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: `Product not Found with id ${productId}` });
        }

        const review = await Review.create({
            product: productId,
            // user: req.userId,
            rating,
            comment,
            title,
            images: images && images.split(', '),
            // verifiedPurchase: req.user.verifiedPurchase
        });
        res.json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

const updateProductReview = async (req, res) => {

    const { reviewId } = req.params;
    const { rating, comment, title, images } = req.body;

    try {

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: `Review not Found with id ${reviewId}` });
        }
        if (review.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this review' });
        }
        review.rating = rating;

    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

const deleteProductReview = async (req, res) => {

    try {
        const { reviewId } = req.params;

        await Review.findByIdAndDelete(reviewId);

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

module.exports = { getProductReviews, createProductReview, updateProductReview, deleteProductReview }