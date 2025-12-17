// models/Question.js
const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    // Link to the Test this question belongs to
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    // Optional image URL for the question
    questionImageURL: {
        type: String,
        default: ''
    },
    // Array of options (A, B, C, D)
    options: [
        {
            id: { type: Number, required: true }, // e.g., 0, 1, 2, 3
            text: { type: String, required: true }
        }
    ],
    // The ID of the correct option (e.g., 1 if 'B' is correct)
    correctOptionId: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true,
        default: 1
    },
    solutionText: {
        type: String, // Explanation shown after test submission
        default: ''
    }
});

module.exports = mongoose.model('Question', questionSchema);