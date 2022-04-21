const express = require('express');
const router = express.Router();

const restaurantController = require('./../controllers/restaurantController');
const { verifyJwtToken, loggedInUser } = require('./../controllers/authController');

router.get('/', restaurantController.getAllRestaurants);
router.get('/orders-self', verifyJwtToken, loggedInUser, restaurantController.getAllRestaurantOrders);
router.get('/orders', restaurantController.getAllOrders);
router.get('/items-self', verifyJwtToken, loggedInUser, restaurantController.getAllItems);
//need to do this
router.get('/orders/items/:oId', verifyJwtToken, loggedInUser, restaurantController.getItems)

router.get('/items/:rid', restaurantController.getAllItems);
router.post('/items', verifyJwtToken, loggedInUser, restaurantController.addItem);

router.patch('/orders/:oid', verifyJwtToken, loggedInUser, restaurantController.finishOrder);

router.patch('/items/:id', restaurantController.updateItem);
router.delete('/items/:id', restaurantController.deleteItem);
router.get('/:rId', restaurantController.getOneRestaurant);
// router.delete('/items/:id',verifyJwtToken, loggedInUser, restaurantController.deleteItem);


module.exports = router;