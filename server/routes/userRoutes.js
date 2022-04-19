const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');
const {verifyJwtToken, loggedInUser} = require('./../controllers/authController');

router.get('/', userController.getAllUsers);
router.post('/order/:rid', verifyJwtToken, loggedInUser, userController.placeOrder);

module.exports = router;