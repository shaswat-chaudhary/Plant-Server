const express = require('express');
const { adminLogin, logout, changePassword, getProfile } = require('../controller/AdminAuthController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', protect, logout);
router.get('/profile', protect,  getProfile);
router.put('/change-password', protect, changePassword);

module.exports = router