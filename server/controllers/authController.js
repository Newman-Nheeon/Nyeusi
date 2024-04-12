const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
require('dotenv').config();


// Admin registration
exports.registerAdmin = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const adminExists = await Admin.findOne({ $or: [{ username }, { email }] });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin with the given username or email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            username,
            email,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// Admin login
exports.loginAdmin = async (req, res) => {
    const { login, password } = req.body;

    try {
        const admin = await Admin.findOne({ $or: [{ username: login }, { email: login }] });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true, // The cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV !== 'development', // Only transfer cookies over HTTPS
            maxAge: 3600000, // Cookie expiration set to match token expiration (1 hour)
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// Set New Password
exports.setNewPassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};