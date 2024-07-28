const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

router.get('/updates',volunteerController.getVolunteerUpdates);

module.exports = router;
