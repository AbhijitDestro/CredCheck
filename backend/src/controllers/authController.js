const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, password, and role' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const user = await User.create({
            name,
            email,
            password,
            role
        });
        
        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id, user.role)
                }
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password, !role){
            return res.status(400).json({ success: false, message: 'Please provide email, password, and role' });
        }
        
        const user = await User.findOne({ email }).select('+password');
        
        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id, user.role)
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create admin (First time setup or by existing admin)
// @route   POST /api/auth/create-admin
// @access  Private/Admin or First Setup
const createAdmin = async (req, res) => {
    try {
        const { name, email, password, setupKey } = req.body;
        
        // Check if any admin exists
        const adminExists = await User.findOne({ role: 'admin' });
        
        // If admin exists, only allow other admins to create new admin
        if (adminExists) {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Only admins can create new admin accounts' 
                });
            }
        } else {
            // First admin setup - verify setup key
            if (setupKey !== process.env.ADMIN_SETUP_KEY) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Invalid setup key' 
                });
            }
        }
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        
        const admin = await User.create({
            name,
            email,
            password,
            role: 'admin'
        });
        
        res.status(201).json({
            success: true,
            data: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token: generateToken(admin._id, admin.role)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getMe,
    createAdmin
};