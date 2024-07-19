// packages
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const morgan = require('morgan');
const logger = require('./logger');

// configs
const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();
app.use((req, res, next) => {
    logger.info(`[Request] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
    next();
  });


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
const corsOptions = require('./config/corsConfig');


// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);
app.get('/verification-successful', (req, res)=>{res.send("verification successful");});
app.get('/verified', (req, res)=>{res.send("Already Verified");});



// Database Connection
connectDB();

mongoose.connection.on('open', () => {
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    logger.error('Database connection error:', err);
});
