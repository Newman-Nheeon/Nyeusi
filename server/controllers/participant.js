const emailService = require('../utils/sendEmail');
const crypto = require('crypto');
const Participant = require('../models/participant'); // Corrected model import

exports.submitEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Email address is required' });
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  try {
    const newUser = new Participant({
      email,
      verificationToken,
      isEmailVerified: false, // Corrected field name
    });
    await newUser.save();

    await emailService.sendVerificationEmail(email, verificationToken);
    res.send({ message: 'Verification email sent.' });
  } catch (error) {
    console.error('Error in registering Participant:', error);
    res.status(500).send({ message: 'Failed to register user.' });
  }
};

exports.completeRegistration = async (req, res) => {
  const { email, firstName, lastName, stageName, socialMediaHandle, comment, termsAccepted, socialMediaPlatform, profileImage, entryImage } = req.body;
  
  try {
    const user = await Participant.findOne({ email, isEmailVerified: true }); // Corrected query
    if (!user) {
      return res.status(400).send('User not found or email not verified.');
    }
    
    Object.assign(user, { firstName, lastName, stageName, socialMediaHandle, comment, termsAccepted, socialMediaPlatform, profileImage, entryImage });
    await user.save();
    
    res.send('Registration complete.');
  } catch (error) {
    console.error('Error completing registration:', error); // Added console.error for debugging
    res.status(500).send('Error completing registration.');
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await Participant.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send({ message: 'Invalid or expired verification token.' });
    }

    user.isEmailVerified = true; // Corrected field name
    user.verificationToken = ''; // Clear the verification token
    await user.save();

    res.send('Email verified successfully');
  } catch (error) {
    console.error('Error verifying email:', error); // Added console.error for debugging
    res.status(500).send({ message: 'Failed to verify email.' });
  }
};
