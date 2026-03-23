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
    getAllUsers,
    previewTemplate
} = require('../controllers/issuerController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
            'application/csv',
            'application/octet-stream'
        ];
        // Allow based on mimetype OR file extension
        if (allowedTypes.includes(file.mimetype) || file.originalname.match(/\.(xlsx|xls|csv)$/i)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type: ${file.mimetype}`), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.use(protect, issuerOnly);

router.post('/upload', upload.single('file'), uploadCertificates);
router.post('/issue', issueCertificate);
router.get('/preview-template', previewTemplate);
router.get('/certificates', getAllCertificates);
router.delete('/certificates/:id', deleteCertificate);
router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);

module.exports = router;