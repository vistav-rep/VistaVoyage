const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer setup for Excel uploads — absolute path under backend/uploads/
const uploadDir = path.join(__dirname, '..', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.xlsx' && ext !== '.xls') {
      return cb(new Error('Only Excel files (.xlsx, .xls) are allowed'), false);
    }
    cb(null, true);
  }
});

router.post('/import', upload.single('file'), packageController.importPackages);
router.get('/', packageController.getPackages);
router.get('/:id', packageController.getPackageById);
router.put('/:id', packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;
