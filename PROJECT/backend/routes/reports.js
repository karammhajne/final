const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.post('/', auth, reportController.createReport);
router.get('/user/:userID', auth, reportController.getReportsByUser);

module.exports = router;
