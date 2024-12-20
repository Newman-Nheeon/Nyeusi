const emailService = require('../utils/sendEmail');
const crypto = require('crypto');
const Participant = require('../models/participant');
const checkSocialMediaHandle = require('../utils/checkSocialMedia');
const axios = require('axios');
const logger = require('../logger');



// Submit email
exports.submitEmail = async (req, res) => {
  logger.info('Checks started');
  const { email, captcha } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Email address is required' });
  }
  if (!captcha) {
    return res.status(400).send({ message: 'Captcha is required.' });
  }
  logger.info('Checks done');
  // Google reCAPTCHA verification
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  try {
    logger.info('Recaptcha checks');
    const captchaVerifyResponse = await axios.post(verifyUrl);
    const data = captchaVerifyResponse.data;
    logger.info('is recaptchs sucessful');
    if (!data.success) {
      return res.status(400).json({ message: "Invalid Captcha. Try again.", errors: data['error-codes'] });
    }
    logger.info('test 1');
    let participant = await Participant.findOne({ email });

    // Check if the participant has already registered and verified their email
    if (participant && participant.isEmailVerified) {
      return res.status(400).send({ message: 'Email is already verified.' });
    }
logger.info('test 2');
    // If already registered but not verified, resend the verification email
    if (participant && !participant.isEmailVerified) {
      await emailService.sendVerificationEmail(email, participant.verificationToken);
      return res.send({ message: 'Verification email resent.' });
    }
logger.info('test 3');
    // New registration
    const verificationToken = crypto.randomBytes(32).toString('hex');
    participant = new Participant({
      email,
      verificationToken,
      isEmailVerified: false,
    });
logger.info('test 4');
    await participant.save();
    await emailService.sendVerificationEmail(email, verificationToken);
    res.send({ message: 'Verification email sent.' });
    logger.info('test 5');
  } catch (error) {
    logger.info('--Error in registering Participant:', error);
    logger.error('Error in registering Participant:', error);
    res.status(500).send({ message: 'Failed to register user. ' + error });
  }
};

// Resend Verification
exports.resendVerificationToken = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email address is required' });
  }

  try {
    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).send({ message: 'Participant not found' });
    }

    if (participant.isEmailVerified) {
      return res.status(400).send({ message: 'Email is already verified.' });
    }

    // Generate a new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    participant.verificationToken = verificationToken;
    await participant.save();

    // Resend the verification email
    await emailService.sendVerificationEmail(email, verificationToken);

    res.send({ message: 'Verification email resent successfully.' });
  } catch (error) {
    logger.error('Error resending verification token:', error);
    res.status(500).send({ message: 'Failed to resend verification token. ' + error });
  }
};



exports.completeRegistration = async (req, res) => {
  const { email, firstName, lastName, stageName, socialMediaHandle, comment, termsAccepted, socialMediaPlatform, entrySocialPost } = req.body;
  console.log('Uploaded files:', req.files); // Debugging

  // Extract the correct path based on the structure of `req.files`
  const profileImagePath = req.files.profileImage ? (req.files.profileImage[0].location || `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.files.profileImage[0].key}`) : null;
  const entryImagePath = req.files.entryImage ? (req.files.entryImage[0].location || `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.files.entryImage[0].key}`) : null;

  try {
    const user = await Participant.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found.');
    }
    if (!user.isEmailVerified) {
      return res.status(400).send('Email not verified.');
    }
    if (user.isFullyRegistered) {
      return res.status(400).send('Participant is already fully registered.');
    }

    if (!firstName || !lastName || !stageName || !socialMediaHandle || !entrySocialPost || termsAccepted === undefined || !socialMediaPlatform || !profileImagePath || !entryImagePath) {
      return res.status(400).send('All fields must be filled to complete registration.');
    }

        // Check if the social media handle exists for the given platform
        const handleExists = await checkSocialMediaHandle(socialMediaHandle, socialMediaPlatform);
    if (!handleExists) {
      return res.status(400).send(
        `Please make sure you're following us before registering, otherwise log in to your social media account and follow us. After following, return in 24 hours to allow our system time to update the follower list`
      );
}

    // Proceed with updating the user's registration details
    user.firstName = firstName;
    user.lastName = lastName;
    user.stageName = stageName;
    user.socialMediaHandle = socialMediaHandle;
    user.entrySocialPost = entrySocialPost;
    user.comment = comment || "";
    user.termsAccepted = termsAccepted;
    user.socialMediaPlatform = socialMediaPlatform;
    user.profileImage = profileImagePath;
    user.entryImage = entryImagePath;
    user.isFullyRegistered = true;
    user.status = 'pending';

    await user.save();
    res.send('Registration complete. Thank you for completing your registration.');
  } catch (error) {
    console.error('Error completing registration:', error); // Improved logging
    res.status(500).send('Error completing registration.');
  }
};




exports.verifyEmail = async (req, res) => {
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const { token, email } = req.query;

  try {
    // Find the user by email
    const user = await Participant.findOne({ email });

    // If no user is found, redirect to verification failed page
    if (!user) {
      return res.redirect(`${FRONTEND_URL}/verification-failed`);
    }

    // Check if the email is already verified
    if (user.isEmailVerified) {
      // Redirect directly to complete registration page
      return res.redirect(`${FRONTEND_URL}/complete-registration?email=${user.email}`);
    }

    // If the token does not match, redirect to verification failed
    if (user.verificationToken !== token) {
      return res.redirect(`${FRONTEND_URL}/verification-failed`);
    }

    // If email is not verified, mark it as verified and clear the token
    user.isEmailVerified = true;
    user.verificationToken = ''; // Clear the token after verification
    await user.save();

    // Redirect to complete registration page
    res.redirect(`${FRONTEND_URL}/complete-registration?email=${user.email}`);
  } catch (error) {
    logger.error("Error verifying email:", error);
    res.redirect(`${FRONTEND_URL}/verification-failed`);
  }
};


