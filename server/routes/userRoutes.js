// routes/userRoutes.js
const express = require('express');
const router = express.Router();
// Import the controller function we just created
const { registerUser, loginUser } = require('../controllers/userController');

// Define the route: POST request to '/' handles registration
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;