const Product = require('../models/productModel');

const getProducts = async (req, res, next) => {

    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateProduct = async (req, res, next) => {
    try {

    } catch (error) {

    }
}

const deleteProduct = async (req, res, next) => {

}

const searchProduct = async (req, res, next) => {

    try {
        const query = req.query.q || '';
        const products = await Product.find({
            $or: [
                { productName: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
            ]
        }).select("productName description category imageUrl price");
        res.status(200).json({ success: true, products });

    } catch (error) {
        console.log(error)
        res.status(404).json({ messsage: "Product Not Found", success: false })
    }

}

const productReview = async (req, res, next) => {
    try {
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { createProduct, getProductById, updateProduct, deleteProduct, searchProduct, getProducts };