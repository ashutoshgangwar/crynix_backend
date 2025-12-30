const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { getProfile } = require('../controllers/user.controller');

router.get('/me', auth, getProfile);

module.exports = router;
