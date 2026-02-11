const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
    uploadCertificates,
    getAllCertificates,
    deleteCertificate,
    getDashboardStats,
    getAllUsers
} = require('../controllers/adminController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Only Excel files are allowed'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.use(protect, adminOnly);

router.post('/upload', upload.single('file'), uploadCertificates);
router.get('/certificates', getAllCertificates);
router.delete('/certificates/:id', deleteCertificate);
router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);

module.exports = router;