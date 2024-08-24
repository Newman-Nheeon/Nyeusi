// packages
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
// const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const logger = require('./logger');
const Admin = require('./models/admin');
const { saveToCSV } = require('./utils/csv');
const { 
  scrapeInstagramFollowers, 
  scrapeFacebookFollowers, 
  scrapeTikTokFollowers 
} = require('./utils/scraper');

// configs
const FILE_PATH = './followers/followers.csv';
const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();

// app.use((req, res, next) => {
//   logger.info(`[Request] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
//   next();
// });

// Setup Morgan to use Winston for logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Imports
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const connectDB = require('./config/db_connect');
// const corsOptions = require('./config/corsConfig');

// Middlewares
app.use(express.json());
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);
app.get('/verification-successful', (req, res) => { res.send("verification successful"); });
app.get('/verified', (req, res) => { res.send("Already Verified"); });
app.get('/scrape', async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).send('Username is required');
  }

  try {
    const instagramFollowers = await scrapeInstagramFollowers(username);
    const facebookFollowers = await scrapeFacebookFollowers(username);
    const tiktokFollowers = await scrapeTikTokFollowers(username);

    const followers = [...instagramFollowers, ...facebookFollowers, ...tiktokFollowers];
    await saveToCSV(followers, FILE_PATH);

    res.send('Followers saved to CSV file');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Database Connection
connectDB();

// Create default super admin if it does not exist
const createDefaultSuperAdmin = async () => {
  const defaultAdminUsername = process.env.DEFAULT_ADMIN_USERNAME;
  const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

  logger.info(`Default Admin Details: Username: ${defaultAdminUsername}, Email: ${defaultAdminEmail}`);

  const existingAdmin = await Admin.findOne({ username: defaultAdminUsername });
  if (!existingAdmin) {
    const superAdmin = new Admin({
      username: defaultAdminUsername,
      email: defaultAdminEmail,
      password: defaultAdminPassword,
      role: 'superadmin'
    });

    await superAdmin.save(); // The pre-save middleware will hash the password
    logger.info('Default super admin created with username: ' + defaultAdminUsername);
  } else {
    logger.info('Default super admin already exists with username: ' + defaultAdminUsername);
  }
};

mongoose.connection.on('open', async () => {
  logger.info('Connected to MongoDB');
  await createDefaultSuperAdmin();
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});



mongoose.connection.on('error', err => {
  logger.error('Database connection error:', err);
});