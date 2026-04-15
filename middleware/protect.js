const { decode } = require('jsonwebtoken');
const Users = require('../models/userModel');
const { verifyToken } = require('./authMiddle');

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized to access this route",
            });
        }

        const decoded = verifyToken(token);
        // console.log('Decoded token:', decoded); // Debug log
        if (!decoded) {
            // console.log('Token verification failed');
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }
        
        const adminId = decoded.id || decoded.userId || decoded._id;
        if (!adminId) {
            // console.log('No ID found in decoded token:', decoded);
            return res.status(401).json({
                success: false,
                message: 'Invalid token structure',
            });
        }

        const admin = await Users.findById(adminId).select('-password');

        // console.log('Admin found:', admin ? 'Yes' : 'No', 'ID searched:', adminId);

        // if (!admin.isActive) {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'Account is disabled. Please contact Administrator',
        //     });
        // }

        req.user = admin;
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false, message: 'Not Authorized',
        })
    }
}

module.exports = { protect }