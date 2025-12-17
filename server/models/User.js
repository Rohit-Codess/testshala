// models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, // No two users can have the same email
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        enum: ['student', 'admin'], // Only these two values are allowed
        default: 'student'
    },
    // An array containing IDs of tests the student has bought
    purchasedTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);