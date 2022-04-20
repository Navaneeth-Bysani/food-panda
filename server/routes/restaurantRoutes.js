const express = require('express');
const router = express.Router();

const restaurantController = require('./../controllers/restaurantController');
const { verifyJwtToken, loggedInUser } = require('./../controllers/authController');

router.get('/', restaurantController.getAllRestaurants);
router.get('/items/:rid', restaurantController.getAllItems);
// router.post('/items/:rid', verifyJwtToken, loggedInUser,restaurantController.addItem);
router.post('/items/:rid', restaurantController.addItem);

module.exports = router;