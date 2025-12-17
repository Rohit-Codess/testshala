// models/Result.js
const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    totalScore: {
        type: Number,
        required: true
    },
    totalTimeTakenSecs: {
        type: Number,
        required: true
    },
    // Detailed breakdown of every answer
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            userSelectedOptionId: { type: Number }, // null if skipped
            isCorrect: { type: Boolean },
            timeTakenSecs: { type: Number }
        }
    ],
    submissionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Result', resultSchema);