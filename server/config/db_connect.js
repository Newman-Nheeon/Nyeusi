const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true); // Addressing the deprecation warning
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database successfully');
    } catch (error) {
        console.error('Could not connect to database:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
