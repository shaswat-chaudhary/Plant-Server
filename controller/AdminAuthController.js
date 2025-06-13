const Users = require('../models/userModel');
const express = require('express');
const JWT = require('jsonwebtoken');

const register = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    try {
        const ExistingUser = await Users.findOne({ email });
        if (ExistingUser) {
            next('User already exists');
        }
        const user = await Users.create({
            name,
            email,
            password,
            role,
        })

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        })
        console.log(error);
    }
}

const login = async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    try {
        const user = await Users.findOne({ email, role }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

module.exports = { register, login }