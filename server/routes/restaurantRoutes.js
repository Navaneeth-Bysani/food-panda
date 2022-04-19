const express = require('express');
const router = express.Router();

const restaurantController = require('./../controllers/restaurantController');

router.get('/', restaurantController.getAllRestaurants);
router.get('/items/:rid', restaurantController.getAllItems);
router.post('/items/:rid', restaurantController.addItem);

module.exports = router;