const whitelist = {
  development: 'http://localhost:3000', // URL of your frontend in development
  production: process.env.FRONTEND_PROD_URL // URL of your frontend in production
};

// Determine the current environment
const currentEnv = process.env.NODE_ENV || 'development';

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist[currentEnv].indexOf(origin) !== -1 || !origin) {
      console.log(`[CORS] Origin allowed: ${origin}`);
      callback(null, true); // Allow if the origin is in the whitelist or server-to-server requests (no origin)
    } else {
      console.log(`[CORS] Origin not allowed: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, // Credentials are supported (cookies, HTTP authentication)
};

module.exports = corsOptions;
