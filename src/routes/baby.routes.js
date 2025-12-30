const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { createBaby, getBabies } = require('../controllers/baby.controller');

// Create a new baby profile (protected)
router.post('/', auth, createBaby);

// Get all babies of logged-in user (protected)
router.get('/', auth, getBabies);

module.exports = router;
