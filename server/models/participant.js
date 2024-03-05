const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: false },
  isFullyRegistered: { type: Boolean, default: false },
  socialMediaHandle: String,
  socialMediaPlatform: String,
  stageName: String,
  firstName: String,
  lastName: String,
  profileImage: String, // Store the path or URL to the image
  entryImage: String, // Store the path or URL to the image
  comment: String,
  termsAccepted: { type: Boolean, default: false }, // Ensure this matches your form/req.body
  totalVotes: { type: Number, default: 0 }
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant; // Export the Participant model
