const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const user = require('../models/participant');
dotenv.config();


// Configure Nodemailer with your SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ACCOUNT, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email account password or app password
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.BASE_URL}/api/verify-email?token=${token}`;
  const mailOptions = {
    from: {
      name: "Nyeusi Music",
      address: process.env.EMAIL_ACCOUNT // Sender address
    }, 
      to: email, // List of receivers
      subject: 'Verify Your Email Address', // Subject line
    html: `<p>Please click on the link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

