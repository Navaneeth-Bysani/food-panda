const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/signup-vendor', authController.signupVendor);
router.get('/login-vendor', authController.loginVendor);

module.exports = router;