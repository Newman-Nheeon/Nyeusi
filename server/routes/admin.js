const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, setNewPassword } = require('../controllers/authController');
const { forgotPassword } = require('../controllers/forgetPasswordController');
const verifyJWT = require('../config/verifyJWT');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/new-password', setNewPassword);
router.post('/forget-password', forgotPassword);
router.get('/dashboard', verifyJWT, (req, res) => {res.status(200).send('Access to the admin dashboard.');});

module.exports = router;
