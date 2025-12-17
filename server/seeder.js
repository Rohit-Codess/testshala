// testshala-backend/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('colors'); // Optional: makes terminal output prettier (npm i colors)

// Load Models
const User = require('./models/User');
const Test = require('./models/Test');
const Question = require('./models/Question');
const Result = require('./models/Result');

// Load Sample Data
const sampleTests = require('./data/sampleTests');
const sampleQuestions = require('./data/sampleQuestions');

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo DB Connected for Seeding...'.blue.bold))
    .catch(err => {
        console.error(`${err}`.red.bold);
        process.exit(1);
    });


// --- FUNCTION TO IMPORT DATA ---
const importData = async () => {
    try {
        // 1. WIPE EXISTING DATA TO START FRESH
        await User.deleteMany();
        await Test.deleteMany();
        await Question.deleteMany();
        await Result.deleteMany();
        console.log('Data Destroyed...'.red.inverse);

        // 2. CREATE AN ADMIN USER (Optional but useful)
        // const createdAdmin = await User.create({
        //     name: 'Admin User',
        //     email: 'admin@example.com',
        //     password: '$2a$10$SomeHashedPasswordHere', // You'd need a real hashed pass
        //     role: 'admin'
        // });

        // 3. INSERT TESTS AND GET THEIR IDs
        // We insert the tests first so we get their MongoDB _id back
        const createdTests = await Test.insertMany(sampleTests);
        
        const sscTestId = createdTests[0]._id;
        const ibpsTestId = createdTests[1]._id;

        console.log(`Tests Inserted: SSC ID: ${sscTestId}, IBPS ID: ${ibpsTestId}`.green.inverse);


        // 4. PREPARE AND INSERT QUESTIONS WITH CORRECT TEST IDs
        let currentTestId = sscTestId; // Start with the first test
        
        const questionsWithLinks = sampleQuestions.map((q) => {
            // If the data flag indicates next test, switch the ID
            if (q.isNextTestStart) {
                currentTestId = ibpsTestId;
            }
            // Return the question object plus the correct testId link
            return { ...q, testId: currentTestId };
        });

        await Question.insertMany(questionsWithLinks);
        console.log('Questions Inserted & Linked...'.green.inverse);

        console.log('DATA IMPORTED SUCCESSFULLY!'.green.bold.underline);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// --- FUNCTION TO DESTROY DATA (Utility) ---
const destroyData = async () => {
    try {
        await User.deleteMany();
        await Test.deleteMany();
        await Question.deleteMany();
        await Result.deleteMany();

        console.log('Data Destroyed! Database is empty.'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Decide which function to run based on command line argument
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}