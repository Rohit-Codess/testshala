// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express App
const app = express();

// --- MIDDLEWARE ---
app.use(express.json()); // Allows server to accept JSON data in requests
app.use(cors()); // Allows frontend to communicate with backend

// --- DATABASE CONNECTION ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

// Call the connection function
connectDB();

app.use('/api/users', require('./routes/userRoutes'));

// --- BASIC ROUTE (For testing) ---
app.get('/', (req, res) => {
    res.send('Testshala API is running...');
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));