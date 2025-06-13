const Users = require('../models/userModel');
const express = require('express');
const bcrypt = require('bcryptjs');
const { options } = require('../routes/userRouter');
const verifyToken = require('../middleware/authMiddle');

// require('dotenv').config();

// const twilio = require('twilio');

// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioClient = twilio(accountSid, authToken);
// const twilioNumber = process.env.TWILIO_PHONE_NUMBER;


// const generateOtp = () => {
//     let otp = Math.floor(100000 + Math.random() * 900000).toString();
//     return otp;
// }

// async function sendOtp(number, otp) {
//     try {
//         await twilioClient.messages.create({
//             body: `Your OTP is ${otp}`,
//             from: twilioNumber,
//             to: number,
//         });
//         return true;
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//     }
// }

// const requestOtp = async (req, res, next) => {
//     const { number } = req.body;

//     if (!number) {
//         return res.status(400).json({ message: 'Please provide a number' });
//     }

//     try {

//         const otp = generateOtp();
//         const optExpire = Date.now() + 10 * (60 * 1000); // 10 minutes from now

//         let user = await Users.findOne({ number });

//         if (!user) {
//             user = new Users({
//                 number,
//                 otp,
//                 optExpire,
//             });
//         } else {
//             user.otp = otp;
//             user.optExpire = optExpire;
//             user.isVerified = false;
//         }
//         await user.save();

//         const message = await sendOtp(number, otp);

//         // const message = await twilioClient.messages.create({
//         //     body: `Your OTP is ${otp}`,
//         //     from: twilioNumber,
//         //     to: number,
//         // });

//         if (!message) {
//             return res.status(500).json({ message: 'Error sending OTP' });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'OTP sent successfully',
//             user,
//         });

//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }
