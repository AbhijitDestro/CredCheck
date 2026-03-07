const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({ success: false, message: 'Not authorized, no token' });
            }
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded) {
                return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
            }
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }
    
    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

const issuerOnly = (req, res, next) => {
    if (req.user && req.user.role === 'issuer') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Issuer only.' });
    }
};

module.exports = { protect, issuerOnly };