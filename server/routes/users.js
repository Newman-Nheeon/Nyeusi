const express = require('express');
const router = express.Router();
const userController = require('../controllers/participant');


// Registration endpoint
router.post('/complete-registration', userController.completeRegistration);

// Email verification endpoint
router.get('/verify-email', userController.verifyEmail);

// Email Submission endpoint
router.post('/submit-email', userController.submitEmail );

module.exports = router;
