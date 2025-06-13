const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');


const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ message: 'Order created successfully' });

    } catch (error) {
        res.status(404).json({ message: 'Order creation failed' });
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = await Order.findById(req.params.id).populate('userId').populate('products.productId');

        if (!orderId) {
            res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ orderId });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



modules.exports = { createOrder, getOrders, getOrderById }