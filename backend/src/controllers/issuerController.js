const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const { sendCertificateEmail } = require('../utils/emailService');
const { generateCertificatePDF } = require('../utils/pdfGenerator');

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
        let successCount = 0;
        
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            
            // Validate required fields (Flexible keys)
            const studentName = row.studentName || row.StudentName || row.Name || row.name;
            const studentEmail = row.email || row.Email || row.studentEmail || row.StudentEmail || row.studentemail;
            const domain = row.internshipDomain || row.InternshipDomain || row.Domain || row.domain || row.Course || row.internshipdomain;
            const startDateRaw = row.startDate || row.StartDate;
            const endDateRaw = row.endDate || row.EndDate;
            let certificateId = row.certificateId || row.CertificateId || row.ID;
            
            if (!studentName || !studentEmail || !domain) {
                errors.push(`Row ${i + 2}: Missing required fields (Name, Email, Domain)`);
                continue;
            }
            
            // Generate ID if missing
            if (!certificateId) {
                certificateId = `CERT-${Date.now()}-${Math.floor(Math.random() * 10000)}-${i}`.toUpperCase();
            } else {
                 // Check for duplicate certificate ID if provided
                const existingCert = await Certificate.findOne({ 
                    certificateId: certificateId.toString().toUpperCase() 
                });
                
                if (existingCert) {
                    errors.push(`Row ${i + 2}: Certificate ID ${certificateId} already exists`);
                    continue;
                }
            }
            
            // Parse dates
            let startDate = new Date();
            let endDate = new Date();
            
            try {
                if (startDateRaw) startDate = parseExcelDate(startDateRaw);
                if (endDateRaw) endDate = parseExcelDate(endDateRaw);
            } catch (dateError) {
                // If dates are invalid, we default to today
            }
            
            const newCert = new Certificate({
                certificateId: certificateId.toString().toUpperCase(),
                studentName: studentName.trim(),
                studentEmail: studentEmail.trim().toLowerCase(),
                domain: domain.trim(),
                startDate,
                endDate,
                uploadedBy: req.user._id
            });
            
            await newCert.save();
            certificates.push(newCert);
            successCount++;

            // Send Email
            try {
                const emailResult = await sendCertificateEmail(
                    newCert.studentEmail,
                    newCert.studentName,
                    newCert.certificateId,
                    newCert.domain,
                    newCert.startDate,
                    newCert.endDate
                );

                if (emailResult.success) {
                    newCert.emailSent = true;
                    newCert.emailSentAt = Date.now();
                    await newCert.save();
                }
            } catch (emailError) {
                console.error(`Email failed for ${newCert.studentEmail}`);
            }
        }
        
        res.status(201).json({
            success: true,
            message: `Successfully uploaded ${successCount} certificates`,
            data: {
                totalRows: data.length,
                inserted: successCount,
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
    return new Date();
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
            { $group: { _id: '$domain', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        
        // Recent certificates
        const recentCertificates = await Certificate.find({ uploadedBy: req.user._id })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('certificateId studentName domain createdAt status');
        
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
        const { studentName, studentEmail, domain, courseName } = req.body; 

        if (!studentName || !studentEmail || (!domain && !courseName)) {
             return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Generate ID
        const certificateId = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`.toUpperCase();
        
        const certificate = await Certificate.create({
            certificateId,
            studentName,
            studentEmail,
            domain: domain || courseName,
            startDate: new Date(), 
            endDate: new Date(), 
            uploadedBy: req.user._id
        });

         // Send Email
         try {
            const emailResult = await sendCertificateEmail(
                certificate.studentEmail,
                certificate.studentName,
                certificate.certificateId,
                certificate.domain,
                certificate.startDate,
                certificate.endDate
            );

            if (emailResult.success) {
                certificate.emailSent = true;
                certificate.emailSentAt = Date.now();
                await certificate.save();
            }
        } catch (emailError) {
            console.error(`Email failed for ${certificate.studentEmail}`);
        }

        res.status(201).json({
            success: true,
            message: 'Certificate issued and email sent successfully',
            data: certificate
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Preview certificate template PDF
// @route   GET /api/issuer/preview-template
// @access  Private/Issuer
const previewTemplate = async (req, res) => {
    try {
        const dummyData = {
            certificateId: 'SAMPLE-1234',
            studentName: 'John Doe',
            domain: 'Demo Domain Program',
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            createdAt: new Date()
        };
        const pdfBytes = await generateCertificatePDF(dummyData);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=Certificate_Template.pdf');
        res.setHeader('Content-Length', pdfBytes.length);
        
        res.send(Buffer.from(pdfBytes));
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
    getAllUsers,
    previewTemplate
};
