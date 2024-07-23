const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/', reportController.getAllReports);
router.post('/', reportController.createReport);
router.delete('/:reportID', reportController.deleteReport);

module.exports = router;
