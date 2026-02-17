const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateId: { 
        type: String, 
        required: true, 
        unique: true,
        uppercase: true,
        trim: true
    },
    studentName: { 
        type: String, 
        required: true,
        trim: true
    },
    studentEmail: { 
        type: String, 
        required: true,
        lowercase: true,
        trim: true
    },
    domain: { 
        type: String, 
        required: true,
        trim: true
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    status: {
        type: String,
        enum: ['active', 'revoked'],
        default: 'active'
    },
    emailSent: {
        type: Boolean,
        default: false
    },
    emailSentAt: {
        type: Date
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
certificateSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Certificate', certificateSchema);