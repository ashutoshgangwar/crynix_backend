const router = require('express').Router();
const { sendOtp, verifyOtp, googleLogin } = require('../controllers/auth.controller');


router.post('/google-login', googleLogin); 
// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);

module.exports = router;
