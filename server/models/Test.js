// models/Test.js
const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String, // e.g., "SSC CGL", "Banking"
        required: true
    },
    description: {
        type: String,
        required: true
    },
    durationInMinutes: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0 // 0 for free tests
    },
    negativeMarking: {
        type: Number, // e.g., 0.25 or 0.50
        required: true,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true // Admins can hide tests by setting this to false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Test', testSchema);