const express = require('express');
const multer = require('multer');
const path = require('path');
const { 
  getAllTours, 
  getFeaturedTours, 
  getTourById, 
  createTour, 
  updateTour, 
  deleteTour 
} = require('../controllers/tourController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', getAllTours);
router.get('/featured', getFeaturedTours);
router.get('/:id', getTourById);
router.post('/', protect, admin, upload.single('image'), createTour);
router.patch('/:id', protect, admin, upload.single('image'), updateTour);
router.delete('/:id', protect, admin, deleteTour);

module.exports = router;
