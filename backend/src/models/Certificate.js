const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateId: {
        type: String,
        required: [true, 'Certificate ID is required'],
        unique: true,
        uppercase: true,
        trim: true
    },
    studentName: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    domainName: {
        type: String,
        required: [true, 'Domain name is required'],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Index for faster searches
certificateSchema.index({ certificateId: 1 });
certificateSchema.index({ studentName: 'text' });

module.exports = mongoose.model('Certificate', certificateSchema);