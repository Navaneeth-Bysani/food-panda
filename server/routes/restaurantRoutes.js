const express = require('express');
const router = express.Router();

const restaurantController = require('./../controllers/restaurantController');
const { verifyJwtToken, loggedInUser } = require('./../controllers/authController');

router.get('/', restaurantController.getAllRestaurants);
router.get('/items/:rid', restaurantController.getAllItems);
router.post('/items/:rid', verifyJwtToken, loggedInUser,restaurantController.addItem);
router.get('/orders/:rid', restaurantController.getAllRestaurantOrders);
router.get('/orders', restaurantController.getAllOrders);
router.delete('/items/:id',verifyJwtToken, loggedInUser, restaurantController.deleteItem);

module.exports = router;