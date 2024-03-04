const emailService = require('../utils/sendEmail');
const crypto = require('crypto');
const Participant = require('../models/participant'); // Corrected model import

exports.submitEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Email address is required' });
  }

  try {
    let participant = await Participant.findOne({ email });

    // Check if the participant has already registered and verified their email
    if (participant && participant.isEmailVerified) {
      return res.status(400).send({ message: 'Email is already registered and verified.' });
    }

    // If already registered but not verified, resend the verification email
    if (participant && !participant.isEmailVerified) {
      await emailService.sendVerificationEmail(email, participant.verificationToken);
      return res.send({ message: 'Verification email resent.' });
    }

    // New registration
    const verificationToken = crypto.randomBytes(32).toString('hex');
    participant = new Participant({
      email,
      verificationToken,
      isEmailVerified: false,
    });

    await participant.save();
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
    const user = await Participant.findOne({ email });

    // Check if the user was not found or their email has not been verified
    if (!user) {
      return res.status(404).send('User not found.');
    }
    if (!user.isEmailVerified) {
      return res.status(400).send('Email not verified.');
    }

    // Check if the participant is already fully registered
    if (user.isFullyRegistered) {
      return res.status(400).send('Participant is already fully registered.');
    }

    // Validate required fields are filled
    if (!firstName || !lastName || !stageName || !socialMediaHandle || !comment || !termsAccepted || !socialMediaPlatform || !profileImage || !entryImage) {
      return res.status(400).send('All fields must be filled to complete registration.');
    }

    // Update the user with the new data and mark them as fully registered
    user.firstName = firstName;
    user.lastName = lastName;
    user.stageName = stageName;
    user.socialMediaHandle = socialMediaHandle;
    user.comment = comment;
    user.termsAccepted = termsAccepted;
    user.socialMediaPlatform = socialMediaPlatform;
    user.profileImage = profileImage;
    user.entryImage = entryImage;
    user.isFullyRegistered = true;

    await user.save();
    
    res.send('Registration complete. Thank you for completing your registration.');
  } catch (error) {
    console.error('Error completing registration:', error);
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
