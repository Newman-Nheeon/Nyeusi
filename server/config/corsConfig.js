const logger = require('../logger');
const whitelist = {
  development: 'http://localhost:3000', // URL of your frontend in development
  production: process.env.FRONTEND_PROD_URL // URL of your frontend in production
};

// Determine the current environment
const currentEnv = process.env.NODE_ENV || 'development';

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // logger.info(`Current environment is: ${currentEnv}`);
    // logger.info(`Whitelist for ${currentEnv}: ${whitelist[currentEnv]}`);
    // logger.info(`Whitelist type: ${whitelist[currentEnv].constructor.name}`);
    // logger.info(`[CORS] Received request from origin: ${origin}`);
    // logger.info(`Origin type: ${origin ? origin.constructor.name : 'undefined'}`);
    // logger.info(`Check origin in whitelist: ${whitelist[currentEnv].indexOf(origin)}`);
    // logger.info(`Test specific string: "https://gbd.nyeusi.org".indexOf("https://gbd.nyeusi.org") = ${"https://gbd.nyeusi.org".indexOf("https://gbd.nyeusi.org")}`);
    
    if (whitelist[currentEnv].indexOf(origin) !== -1 || !origin) {
      logger.info(`[CORS] Origin allowed: ${origin}`);
      callback(null, true); // Allow if the origin is in the whitelist or server-to-server requests (no origin)
    } else {
      logger.info(`[CORS] Origin not allowed: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, // Credentials are supported (cookies, HTTP authentication)
};

module.exports = corsOptions;
