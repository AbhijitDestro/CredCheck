const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['student', 'issuer']).withMessage('Role must be either student or issuer')
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], loginUser);

router.get('/me', protect, getProfile);
router.put('/update', protect, updateProfile);

module.exports = router;
