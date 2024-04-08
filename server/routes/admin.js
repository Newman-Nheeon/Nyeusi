const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, setNewPassword } = require('../controllers/authController');
const { forgotPassword } = require('../controllers/forgetPasswordController');
const verifyJWT = require('../config/verifyJWT');
const { approveParticipant, declineParticipant, totalParticipant } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/new-password', setNewPassword);
router.post('/forget-password', forgotPassword);
router.get('/dashboard', verifyJWT, (req, res) => {res.status(200).send('Access to the admin dashboard.');});
router.patch('/approve/:participantId', verifyJWT, approveParticipant);
router.patch('/decline/:participantId', verifyJWT, declineParticipant);
router.get('/total-participant', totalParticipant);

module.exports = router;
