const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'issuer'],
        default: 'student'
    },
    organizationName: {
        type: String,
        trim: true
    },
    signatureBase64: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    certificates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate'
    }]
});


module.exports = mongoose.model('User', userSchema);