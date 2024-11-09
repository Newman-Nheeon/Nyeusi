require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const Follower = require('../models/followers'); // Update this path as necessary

// Suppress the deprecation warning
mongoose.set('strictQuery', true);
const logger = require('../logger');

// Ensure your DB connection string is correctly defined in your .env file
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

const importFollowersFromCSV = (filePath, platform) => {
  const followers = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => followers.push({ platform, username: data.username }))
      .on('end', async () => {
        try {
          for (const follower of followers) {
            const existingFollower = await Follower.findOne({ platform: follower.platform, username: follower.username });
            if (!existingFollower) {
              await Follower.create(follower);
            }
          }
          logger.info(`${followers.length} followers processed successfully for ${platform}`);
          resolve();
        } catch (err) {
          logger.error(`Failed to import followers for ${platform}:`, err);
          reject(err);
        }
      });
  });
};

const platforms = ['instagram', 'tiktok', 'facebook'];

(async () => {
  for (const platform of platforms) {
    const filePath = path.join(__dirname, `../followers/${platform}_followers.csv`);
    if (fs.existsSync(filePath)) {
      try {
        await importFollowersFromCSV(filePath, platform);
      } catch (err) {
        logger.error(`Error importing data for ${platform}:`, err);
      }
    } else {
      logger.error(`CSV file for ${platform} not found at path: ${filePath}`);
    }
  }
  mongoose.disconnect();
})();
