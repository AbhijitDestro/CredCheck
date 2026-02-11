const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');
const User = require('../models/User');

// @desc    Upload certificates via Excel
// @route   POST /api/admin/upload
// @access  Private/Admin
const uploadCertificates = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an Excel file' });
        }
        
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        if (data.length === 0) {
            return res.status(400).json({ success: false, message: 'Excel file is empty' });
        }
        
        const certificates = [];
        const errors = [];
        
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            
            // Validate required fields
            if (!row.certificateId || !row.studentName || !row.internshipDomain || 
                !row.startDate || !row.endDate) {
                errors.push(`Row ${i + 2}: Missing required fields`);
                continue;
            }
            
            // Check for duplicate certificate ID
            const existingCert = await Certificate.findOne({ 
                certificateId: row.certificateId.toString().toUpperCase() 
            });
            
            if (existingCert) {
                errors.push(`Row ${i + 2}: Certificate ID ${row.certificateId} already exists`);
                continue;
            }
            
            // Parse dates
            let startDate, endDate;
            try {
                startDate = parseExcelDate(row.startDate);
                endDate = parseExcelDate(row.endDate);
            } catch (dateError) {
                errors.push(`Row ${i + 2}: Invalid date format`);
                continue;
            }
            
            certificates.push({
                certificateId: row.certificateId.toString().toUpperCase(),
                studentName: row.studentName.trim(),
                email: row.email ? row.email.trim().toLowerCase() : '',
                internshipDomain: row.internshipDomain.trim(),
                startDate,
                endDate,
                uploadedBy: req.user._id
            });
        }
        
        let insertedCount = 0;
        if (certificates.length > 0) {
            const result = await Certificate.insertMany(certificates);
            insertedCount = result.length;
        }
        
        res.status(201).json({
            success: true,
            message: `Successfully uploaded ${insertedCount} certificates`,
            data: {
                totalRows: data.length,
                inserted: insertedCount,
                errors: errors.length > 0 ? errors : null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Helper function to parse Excel dates
const parseExcelDate = (excelDate) => {
    if (typeof excelDate === 'number') {
        // Excel serial date
        const date = new Date((excelDate - 25569) * 86400 * 1000);
        return date;
    } else if (typeof excelDate === 'string') {
        const date = new Date(excelDate);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return date;
    }
    throw new Error('Invalid date format');
};

// @desc    Get all certificates
// @route   GET /api/admin/certificates
// @access  Private/Admin
const getAllCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const total = await Certificate.countDocuments();
        const certificates = await Certificate.find()
            .populate('uploadedBy', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        res.json({
            success: true,
            data: {
                certificates,
                pagination: {
                    current: page,
                    pages: Math.ceil(total / limit),
                    total
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete certificate
// @route   DELETE /api/admin/certificates/:id
// @access  Private/Admin
const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        
        await certificate.deleteOne();
        
        res.json({
            success: true,
            message: 'Certificate deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalCertificates = await Certificate.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        
        // Get certificates by domain
        const certificatesByDomain = await Certificate.aggregate([
            { $group: { _id: '$internshipDomain', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        
        // Recent certificates
        const recentCertificates = await Certificate.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('certificateId studentName internshipDomain createdAt');
        
        res.json({
            success: true,
            data: {
                totalCertificates,
                totalUsers,
                totalAdmins,
                certificatesByDomain,
                recentCertificates
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    uploadCertificates,
    getAllCertificates,
    deleteCertificate,
    getDashboardStats,
    getAllUsers
};