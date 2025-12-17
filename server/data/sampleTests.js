// testshala-backend/data/sampleTests.js
const sampleTests = [
    {
        title: "SSC CGL Tier-1 Full Mock Test 01",
        category: "SSC CGL",
        description: "Based on the latest SSC pattern. Covers General Intelligence, Awareness, Quantitative Aptitude, and English Comprehension.",
        durationInMinutes: 60,
        totalMarks: 200,
        price: 0, // Free test
        negativeMarking: 0.50,
        isActive: true
    },
    {
        title: "IBPS PO Prelims Mock Test 2024",
        category: "Banking",
        description: "High-level questions for Banking aspirants. Test your speed and accuracy.",
        durationInMinutes: 60,
        totalMarks: 100,
        price: 99, // Paid test
        negativeMarking: 0.25,
        isActive: true
    }
];

module.exports = sampleTests;