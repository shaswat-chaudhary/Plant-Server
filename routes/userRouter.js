const express = require('express');
const router = express.Router();


const { register, login } = require('../controller/AdminAuthController');


router.post('/register', register);
router.post('/login', login);
// router.post('/request-otp', requestOtp)



module.exports = router;