const logger = require('../logger');

// Whitelist for allowed origins
const whitelist = {
  development: ['http://localhost:3000'], // Array of URLs for development
  production: [process.env.FRONTEND_PROD_URL || 'https://gbd.nyeusi.org'] // Array for production
};

// Determine the current environment
const currentEnv = process.env.NODE_ENV || 'development';

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Uncomment for debugging
    // logger.info(`Current environment is: ${currentEnv}`);
    // logger.info(`Whitelist for ${currentEnv}: ${whitelist[currentEnv]}`);
    // logger.info(`Whitelist type: ${whitelist[currentEnv].constructor.name}`);
    // logger.info(`[CORS] Received request from origin: ${origin}`);
    // logger.info(`Origin type: ${origin ? origin.constructor.name : 'undefined'}`);
    // logger.info(`Check origin in whitelist: ${whitelist[currentEnv].indexOf(origin)}`);
    // logger.info(`Test specific string: "https://gbd.nyeusi.org".indexOf("https://gbd.nyeusi.org") = ${"https://gbd.nyeusi.org".indexOf("https://gbd.nyeusi.org")}`);
    
    const allowedOrigins = whitelist[currentEnv]; // Get the list of allowed origins for the current environment

    // Check if the origin is in the whitelist
    if (allowedOrigins.includes(origin) || !origin) {
      logger.info(`[CORS] Origin allowed: ${origin}`);
      callback(null, true); // Allow if origin is in the whitelist or if it's a server-to-server request (no origin)
    } else {
      logger.info(`[CORS] Origin not allowed: ${origin}`);
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  },
  optionsSuccessStatus: 200, // Legacy browsers (IE11, etc.) choke on 204
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

module.exports = corsOptions;
