const express = require('express');
const router = express.Router();
const userController = require('../controllers/participant');
const { submitVote, showParticipant } = require('../controllers/voting');

// Registration endpoint
router.post('/complete-registration', userController.completeRegistration);

// Email verification endpoint
router.get('/verify-email', userController.verifyEmail);

// Email Submission endpoint
router.post('/submit-email', userController.submitEmail );

// Submit Votes endpoint
router.post('/vote', submitVote);

// Show participant endpoint
router.get('/participant', showParticipant);

module.exports = router;
