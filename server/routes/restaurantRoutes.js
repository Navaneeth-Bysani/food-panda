const express = require('express');
const router = express.Router();

const restaurantController = require('./../controllers/restaurantController');
const { verifyJwtToken, loggedInUser } = require('./../controllers/authController');

router.get('/', restaurantController.getAllRestaurants);
router.get('/orders', restaurantController.getAllOrders);
router.get('/:rId', restaurantController.getOneRestaurant);
router.get('/items/:rid', restaurantController.getAllItems);
router.post('/items/:rid', restaurantController.addItem);
// router.post('/items/:rid', verifyJwtToken, loggedInUser,restaurantController.addItem);
router.get('/orders/:rid', restaurantController.getAllRestaurantOrders);

router.delete('/items/:id', restaurantController.deleteItem);
// router.delete('/items/:id',verifyJwtToken, loggedInUser, restaurantController.deleteItem);


module.exports = router;