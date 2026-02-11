const Certificate = require('../models/Certificate');
const { generateCertificatePDF } = require('../utils/pdfGenerator');

// @desc    Search certificate by ID
// @route   GET /api/certificates/search/:certificateId
// @access  Public
const searchCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        
        const certificate = await Certificate.findOne({ 
            certificateId: certificateId.toUpperCase() 
        });
        
        if (!certificate) {
            return res.status(404).json({ 
                success: false, 
                message: 'Certificate not found. Please check the certificate ID and try again.' 
            });
        }
        
        res.json({
            success: true,
            data: {
                certificateId: certificate.certificateId,
                studentName: certificate.studentName,
                internshipDomain: certificate.internshipDomain,
                startDate: certificate.startDate,
                endDate: certificate.endDate,
                issueDate: certificate.issueDate,
                isVerified: certificate.isVerified
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Download certificate as PDF
// @route   GET /api/certificates/download/:certificateId
// @access  Public
const downloadCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        
        const certificate = await Certificate.findOne({ 
            certificateId: certificateId.toUpperCase() 
        });
        
        if (!certificate) {
            return res.status(404).json({ 
                success: false, 
                message: 'Certificate not found' 
            });
        }
        
        const pdfBytes = await generateCertificatePDF(certificate);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Certificate_${certificate.certificateId}.pdf`);
        res.setHeader('Content-Length', pdfBytes.length);
        
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify certificate
// @route   POST /api/certificates/verify
// @access  Public
const verifyCertificate = async (req, res) => {
    try {
        const { certificateId, studentName } = req.body;
        
        const certificate = await Certificate.findOne({ 
            certificateId: certificateId.toUpperCase()
        });
        
        if (!certificate) {
            return res.json({
                success: true,
                verified: false,
                message: 'Certificate not found in our records'
            });
        }
        
        // Optional: Verify student name matches
        const nameMatches = certificate.studentName.toLowerCase() === studentName.toLowerCase();
        
        res.json({
            success: true,
            verified: true,
            nameMatches,
            data: {
                certificateId: certificate.certificateId,
                studentName: certificate.studentName,
                internshipDomain: certificate.internshipDomain,
                startDate: certificate.startDate,
                endDate: certificate.endDate,
                isVerified: certificate.isVerified
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    searchCertificate,
    downloadCertificate,
    verifyCertificate
};