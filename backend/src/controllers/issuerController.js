const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');
const User = require('../models/User');

// @desc    Upload certificates via Excel
// @route   POST /api/issuer/upload
// @access  Private/Issuer
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
                !row.startDate || !row.endDate || !row.email) {
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
                studentEmail: row.email ? row.email.trim().toLowerCase() : '',
                domain: row.internshipDomain.trim(),
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
// @route   GET /api/issuer/certificates
// @access  Private/Issuer
const getAllCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const total = await Certificate.countDocuments({ uploadedBy: req.user._id });
        const certificates = await Certificate.find({ uploadedBy: req.user._id })
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
// @route   DELETE /api/issuer/certificates/:id
// @access  Private/Issuer
const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ _id: req.params.id, uploadedBy: req.user._id });
        
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
// @route   GET /api/issuer/stats
// @access  Private/Issuer
const getDashboardStats = async (req, res) => {
    try {
        const totalCertificates = await Certificate.countDocuments({ uploadedBy: req.user._id });
        const downloadedCertificates = 0; // Placeholder as we don't track downloads yet
        const revokedCertificates = await Certificate.countDocuments({ uploadedBy: req.user._id, status: 'revoked' });
        
        // Get certificates by domain
        const certificatesByDomain = await Certificate.aggregate([
            { $match: { uploadedBy: req.user._id } },
            { $group: { _id: '$internshipDomain', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        
        // Recent certificates
        const recentCertificates = await Certificate.find({ uploadedBy: req.user._id })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('certificateId studentName internshipDomain createdAt status');
        
        res.json({
            success: true,
            data: {
                totalCertificates,
                downloadedCertificates,
                revokedCertificates,
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

// @desc    Issue single certificate
// @route   POST /api/issuer/issue
// @access  Private/Issuer
const issueCertificate = async (req, res) => {
    try {
        const { studentName, studentEmail, domain, courseName } = req.body; // courseName can be mapped to domain or stored if schema allows

        // Generate ID
        const certificateId = 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        const certificate = await Certificate.create({
            certificateId,
            studentName,
            studentEmail,
            domain: domain || courseName, // Fallback if frontend sends courseName
            startDate: new Date(),
            endDate: new Date(), // Just defaults for now if not provided
            uploadedBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Certificate issued successfully',
            data: certificate
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    uploadCertificates,
    issueCertificate,
    getAllCertificates,
    deleteCertificate,
    getDashboardStats,
    getAllUsers
};