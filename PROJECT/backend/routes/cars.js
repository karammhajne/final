const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, carController.getCars);
router.post('/', authenticateToken, carController.addCar);

module.exports = router;
