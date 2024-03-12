const express = require('express');
const router = express.Router();
const userController = require('../controllers/participant');
const { submitVote, showParticipant } = require('../controllers/voting');
const upload = require('../utils/file');

// Registration endpoint
router.post('/complete-registration', 
  upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'entryImage', maxCount: 1 }]), 
  userController.completeRegistration);

// Email verification endpoint
router.get('/verify-email', userController.verifyEmail);

// Email Submission endpoint
router.post('/submit-email', userController.submitEmail );

// Submit Votes endpoint
router.post('/vote', submitVote);

// Show participant endpoint
router.get('/participant', showParticipant);

module.exports = router;
