// packages
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');

// configs
const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();


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
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.error('Database connection error:', err);
});
