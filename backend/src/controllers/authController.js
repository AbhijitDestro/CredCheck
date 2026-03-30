const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register user/admin
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
            return res.status(400).json({ success: false, message: 'Please provide name, email, password and role' });
        }
        if (!['student', 'issuer'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({ message: 'User registered successfully', success: true, user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, organizationName: newUser.organizationName, signatureBase64: newUser.signatureBase64 }, token });
    }catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}


// @desc    Login user/admin
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role){
            return res.status(400).json({ success: false, message: 'Please provide email, password, and role' });
        }
        const user = await User.findOne({ email }).select('+password');
        if(!user){
            return res.status(400).json({ success: false, message: 'Incorrect email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ success: false, message: 'Incorrect email or password' });
        }
        if(user.role !== role){
            return res.status(400).json({ success: false, message: "Account doesn't exist with current role" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: _p, ...safeUser } = user.toObject();
        return res.status(200).json({ message: `Welcome back ${safeUser.name}`, success: true, user: safeUser, token });
    }catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getProfile = async (req, res) => {
    try {
        return res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        return res.status(200).json({ success: true, message: 'Profile deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/update
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!req.body) {
            return res.status(400).json({ success: false, message: 'No data provided' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.organizationName !== undefined) {
            user.organizationName = req.body.organizationName;
        }

        if (req.file) {
            const base64Image = req.file.buffer.toString('base64');
            user.signatureBase64 = `data:${req.file.mimetype};base64,${base64Image}`;
        }

        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                organizationName: updatedUser.organizationName,
                signatureBase64: updatedUser.signatureBase64,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile,
    logoutUser
};
