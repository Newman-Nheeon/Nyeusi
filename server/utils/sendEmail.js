const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const user = require('../models/user');
dotenv.config();

const sendVerificationEmail = async (email, token) => {
  // Ensure the secure environment variable is correctly interpreted as a boolean
  const secure = process.env.SECURE.toLowerCase() === 'true';

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: secure, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ACCOUNT, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email account password or app password
    },
  });

  // Construct the verification URL using the BASE_URL environment variable
  // In your function to send verification emails
const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}&userId=${user.userId}`;


  // Specify email options
  const mailOptions = {
    from: {
		name: "Nyeusi Music",
		address: process.env.EMAIL_ACCOUNT // Sender address
	}, 
    to: email, // List of receivers
    subject: 'Verify Your Email Address', // Subject line
    html: `<p>To verify your email address, please click on the following link: <a href="${verificationUrl}">Verify Email</a></p>`, // HTML body content
  };

  // Send email with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = sendVerificationEmail;
