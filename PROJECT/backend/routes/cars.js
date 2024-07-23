const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.getAllCars);
router.post('/', carController.createCar);
router.delete('/:carID', carController.deleteCar);

module.exports = router;
