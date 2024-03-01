const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
	userId: { type: String, unique: true, default: uuidv4 }, // Custom user ID
	email: { type: String, required: true, unique: true },
  
  firstName: String,
  lastName: String,
  stageName: String,
  socialMediaHandle: String,
  comments: String,
  termsAndConditions: Boolean,
  socialMediaPostImage: String, // Store the path or URL to the image
  profileImage: String, // Store the path or URL to the image
  verified: { type: Boolean, default: false },
  verificationToken: String,
});

module.exports = mongoose.model('User', userSchema);
