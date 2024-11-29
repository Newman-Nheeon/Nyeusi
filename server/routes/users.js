const express = require('express');
const router = express.Router();
const userController = require('../controllers/participantController');
const { submitVote, showApprovedParticipants } = require('../controllers/votingController');
const upload = require('../utils/file');
const verifyJWT = require('../config/verifyJWT');
const { totalParticipant } = require('../controllers/adminController');

// Middleware to enforce time restrictions based on end date
function enforceEndDate(end) {
  return (req, res, next) => {
    const now = new Date();
    const endTime = new Date(end);

    if (now > endTime) {
      return res.status(403).json({ error: 'This action is no longer available' });
    }
    next();
  };
}

// Define deadlines
const registrationDeadline = '2024-12-15T23:59:59';
const votingDeadline = '2024-12-30T23:59:59';

// Complete registration endpoint
router.post(
  '/complete-registration',
  enforceEndDate(registrationDeadline),
  upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'entryImage', maxCount: 1 }]),
  userController.completeRegistration
);

// Vote submission endpoint
router.post(
  '/vote',
  enforceEndDate(votingDeadline), 
  submitVote
);

// Other routes remain unchanged
router.get('/verify-email', userController.verifyEmail);
router.post('/submit-email', userController.submitEmail);
router.post('/resend-verification-token', userController.resendVerificationToken);
router.get('/participant', showApprovedParticipants);
router.get('/total-participant', verifyJWT, totalParticipant);

module.exports = router;
