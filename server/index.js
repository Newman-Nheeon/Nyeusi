
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const connectDB = require('./config/db_connect');

const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();


// Imports
const userRoutes = require('./routes/users');



// Middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use('/api', userRoutes);
app.get('/verification-successful', (req, res)=>{
    res.send("verification successful");
});
app.get('/verified', (req, res)=>{
    res.send("Already Verified");
});


// Database Connection
connectDB();

mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.error('Database connection error:', err);
});
