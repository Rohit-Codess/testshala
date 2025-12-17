// testshala-backend/data/sampleQuestions.js
const sampleQuestions = [
    // --- Questions for Test 1 (SSC CGL) ---
    {
        questionText: "Which is the capital city of France?",
        options: [
            { id: 0, text: "London" },
            { id: 1, text: "Berlin" },
            { id: 2, text: "Paris" },
            { id: 3, text: "Madrid" }
        ],
        correctOptionId: 2,
        marks: 2,
        solutionText: "Paris is the capital and most populous city of France."
    },
    {
        questionText: "If A + B = 10 and A - B = 4, then what is the value of A*B?",
        options: [
            { id: 0, text: "16" },
            { id: 1, text: "20" },
            { id: 2, text: "21" },
            { id: 3, text: "24" }
        ],
        correctOptionId: 2,
        marks: 2,
        solutionText: "Adding both eq: 2A = 14 => A=7. Putting A in eq 1: 7+B=10 => B=3. So A*B = 7*3 = 21."
    },
     {
        questionText: "Which planet is known as the 'Red Planet'?",
        options: [
            { id: 0, text: "Venus" },
            { id: 1, text: "Jupiter" },
            { id: 2, text: "Mars" },
            { id: 3, text: "Saturn" }
        ],
        correctOptionId: 2,
        marks: 2,
        solutionText: "Mars appears red due to iron oxide prevalent on its surface."
    },
    // Add 2 more to make it 5 questions for the first test
    {
         questionText: "What is the chemical symbol for water?",
         options: [{id:0, text:"H2O"}, {id:1, text:"O2"}, {id:2, text:"CO2"}, {id:3, text:"HO"}],
         correctOptionId: 0, Marks: 2
    },
    {
        questionText: "Who is known as the father of the Indian Constitution?",
        options: [{id:0, text:"M. Gandhi"}, {id:1, text:"J. Nehru"}, {id:2, text:"B.R. Ambedkar"}, {id:3, text:"S. Patel"}],
        correctOptionId: 2, Marks: 2
   },


    // --- Questions for Test 2 (IBPS PO) ---
    {
        // We will use a flag in the script to know when to switch to the next test
        isNextTestStart: true, 
        questionText: "What comes next in the series: 2, 6, 12, 20, __?",
        options: [
            { id: 0, text: "28" },
            { id: 1, text: "30" },
            { id: 2, text: "32" },
            { id: 3, text: "36" }
        ],
        correctOptionId: 1,
        marks: 1,
        solutionText: "Differences are 4, 6, 8. Next difference is 10. 20 + 10 = 30."
    },
     {
        questionText: "Where is the headquarters of RBI located?",
        options: [{id:0, text:"Delhi"}, {id:1, text:"Kolkata"}, {id:2, text:"Mumbai"}, {id:3, text:"Chennai"}],
        correctOptionId: 2, Marks: 1
    }
];

module.exports = sampleQuestions;