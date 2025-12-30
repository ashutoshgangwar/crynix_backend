const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth.middleware');
const { createBabyCry, getBabyCries } = require('../controllers/babyCry.controller');

// Ensure uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `baby_cry_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// POST /api/baby-cry
router.post('/', auth, upload.single('audio'), createBabyCry);

// GET /api/baby-cry?babyId=xxx
router.get('/', auth, getBabyCries);

module.exports = router;
