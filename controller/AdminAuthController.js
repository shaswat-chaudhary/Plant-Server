const { cookieOptions, clearCookieOptions } = require('../config/cookies');
const Users = require('../models/userModel');
const JWT = require('jsonwebtoken');

// const register = async (req, res, next) => {
//     const { name, email, password, role } = req.body;
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Please provide all fields' });
//     }
//     try {
//         const ExistingUser = await Users.findOne({ email });
//         if (ExistingUser) {
//             next('User already exists');
//         }
//         const user = await Users.create({
//             name,
//             email,
//             password,
//             role,
//         })
//         return res.status(201).json({
//             success: true,
//             message: 'User created successfully',
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             },
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//         })
//         console.log(error);
//     }
// }

// const login = async (req, res, next) => {
//     const { email, password } = req.body;

//     // const admin = await User.findOne({ email });

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide all fields' });
//     }
//     try {
//         const user = await Users.findOne({ email }).select('+password');

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
//             expiresIn: '30d',
//         });
//         return res.status(200).json({
//             success: true,
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             },
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//         })
//     }
// }

const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await Users.findOne({ email }).select('+password');
        if (!admin || admin.role !== "admin") {
            return res.status(401).json({ message: "Not Authorized" });
        }
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password Incorrect" });
        }
        const token = JWT.sign({ userId: admin._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        });

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: 'Login successfull',
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                lastLogin: admin.lastLogin,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', clearCookieOptions);
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        })
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during logout',
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const admin = await Users.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            data: admin,
        })
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching admin data",
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const admin = await Users.findById(req.admin.id).select('+password');

        const isMatch = await admin.matchPassword(currentPassword);
        if (isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect', })
        }

        admin.password = newPassword
        await admin.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    } catch (error) {
        console.error(500).json({ success: false, message: 'Error changing password', })
    }
}

module.exports = { adminLogin, logout, getProfile, changePassword }