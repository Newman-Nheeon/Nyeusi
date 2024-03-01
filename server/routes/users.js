const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


// Registration endpoint
router.post('/complete-registeration', userController.completeRegistration);

// Email verification endpoint
router.get('/verify-email/:userId', userController.verifyEmail);

// Email Submission endpoint
router.post('/submit-email', userController.submitEmail );

module.exports = router;
