const sendVerificationEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');


exports.submitEmail = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        const verificationToken = crypto.randomBytes(20).toString('hex');
    
        if (!user) {
            const userId = uuidv4(); // Ensure UUID is generated here
            user = new User({ email, userId, verificationToken, verified: false }); // Assuming the schema has `userId`
            await user.save();
            console.log(`Verification email sent to new user: ${email}`);
        } else if (!user.verified) {
            user.verificationToken = verificationToken;
            await user.save();
            await sendVerificationEmail(email, user.userId, verificationToken); // Resend verification email
            console.log(`Verification email resent to unverified user: ${email}`); // Log that the email is being resent
            return res.status(200).send('Verification email resent. Please check your email.');
        } else {
            return res.status(400).send('This email is already verified.');
        }
    
        await sendVerificationEmail(email, user.userId, verificationToken); // This line seems redundant given the logic above and can likely be removed
        // res.status(200).send('Verification email sent.'); // This is also likely redundant due to the logic above
    } catch (error) {
        console.error('Error in submitEmail:', error);
        res.status(500).send('An error occurred while submitting the email.');
    }
};


  
  


exports.completeRegistration = async (req, res) => {
  const { email, firstName, lastName, stageName, socialMediaHandle, comments, termsAndConditions, socialMediaPostImage, profileImage } = req.body;
  
  try {
    const user = await User.findOne({ email, verified: true });
    if (!user) {
      return res.status(400).send('User not found or email not verified.');
    }
    
    // Update the user with the new data
    Object.assign(user, { firstName, lastName, stageName, socialMediaHandle, comments, termsAndConditions, socialMediaPostImage, profileImage });
    await user.save();
    
    res.send('Registration complete.');
  } catch (error) {
    res.status(500).send('Error completing registration.');
  }
};


exports.verifyEmail = async (req, res) => {
    const userId = req.params.userId;
    const { token } = req.query; // Assuming the token is still sent as a query parameter
  
    try {
      const user = await User.findOne({ _id: userId, verificationToken: token });
  
      if (!user) {
        return res.status(404).send('User not found or invalid verification token.');
      }
  
      if (user.verified) {
        return res.status(400).send('This account has already been verified.');
      }
  
      user.verified = true;
      user.verificationToken = ''; // Optionally clear the token
      await user.save();
  
      res.send('Your account has been successfully verified.');
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).send('An error occurred during verification.');
    }
  };
  

  