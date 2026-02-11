const express = require('express');
const router = express.Router();
const { 
    searchCertificate, 
    downloadCertificate, 
    verifyCertificate 
} = require('../controllers/certificateController');

router.get('/search/:certificateId', searchCertificate);
router.get('/download/:certificateId', downloadCertificate);
router.post('/verify', verifyCertificate);

module.exports = router;