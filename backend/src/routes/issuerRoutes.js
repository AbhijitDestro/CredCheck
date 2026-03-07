const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, issuerOnly } = require('../middleware/authMiddleware');
const {
    uploadCertificates,
    issueCertificate,
    getAllCertificates,
    deleteCertificate,
    getDashboardStats,
    getAllUsers
} = require('../controllers/issuerController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel' || 
            file.mimetype === 'text/csv') {
            cb(null, true);
        } else {
            cb(new Error('Only Excel or CSV files are allowed'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.use(protect, issuerOnly);

router.post('/upload', upload.single('file'), uploadCertificates);
router.get('/certificates', getAllCertificates);
router.delete('/certificates/:id', deleteCertificate);
router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);

module.exports = router;