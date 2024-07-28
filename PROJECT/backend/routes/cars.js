const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/user/:userID', carController.getCarsByUser);
router.post('/', carController.addCar);
router.delete('/:carID', carController.deleteCar);

module.exports = router;
