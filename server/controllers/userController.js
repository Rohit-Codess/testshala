// controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Example Secret (Move to .env later for production!)
// In a real app, you would use process.env.JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token Helper Function
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d', // Token stays valid for 30 days
    });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        // 1. Get data sent from frontend form
        const { name, email, password } = req.body;

        // 2. Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // 3. Check if user already exists in DB
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 4. Hash the password (Security step!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create user in MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            // 6. If successful, send back the new user info and their token
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error during registration' });
    }
};

// @desc    Authenticate a user (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check for user email
        const user = await User.findOne({ email });

        // 2. Check password (compare plain text with hashed pass in DB)
        if (user && (await bcrypt.compare(password, user.password))) {
            // 3. If match, send back user info and a new token
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Export the functions so routes can use them
module.exports = {
    registerUser,
    loginUser
};