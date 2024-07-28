const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.get('/', authenticateToken, userController.getAllUsers);
router.delete('/:id', authenticateToken, userController.deleteUserById);

module.exports = router;
