const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    searchCertificate, 
    downloadCertificate, 
    verifyCertificate,
    getMyCertificates
} = require('../controllers/certificateController');

router.get('/search/:certificateId', searchCertificate);
router.get('/download/:certificateId', downloadCertificate);
router.post('/verify', verifyCertificate);
router.get('/my-certificates', protect, getMyCertificates);

module.exports = router;