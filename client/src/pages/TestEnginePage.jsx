// src/pages/TestEnginePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Import Heroicons for the menu button
// If you get an error, run: npm install @heroicons/react
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// --- MOCK DATA (Enhanced with duration) ---
const mockTestData = {
    title: "SSC CGL Mock Test 1",
    durationSecs: 60 * 60, // 60 minutes
    questions: [
        {
            id: "q1", questionText: "Which of the following is the capital of France?",
            options: [{ id: "opt1", text: "London" }, { id: "opt2", text: "Berlin" }, { id: "opt3", text: "Paris" }, { id: "opt4", text: "Madrid" }],
        },
        {
            id: "q2", questionText: "What is 2 + 2 multiplied by 3?",
            options: [{ id: "opt1", text: "12" }, { id: "opt2", text: "8" }, { id: "opt3", text: "10" }, { id: "opt4", text: "6" }],
        },
        {
            id: "q3", questionText: "Which planet is known as the Red Planet?",
            options: [{ id: "opt1", text: "Venus" }, { id: "opt2", text: "Mars" }, { id: "opt3", text: "Jupiter" }, { id: "opt4", text: "Saturn" }],
        },
        {
            id: "q4", questionText: "Who wrote 'Romeo and Juliet'?",
            options: [{ id: "opt1", text: "Charles Dickens" }, { id: "opt2", text: "William Shakespeare" }, { id: "opt3", text: "Jane Austen" }, { id: "opt4", text: "Mark Twain" }],
        },
        {
            id: "q5", questionText: "What is the chemical symbol for Gold?",
            options: [{ id: "opt1", text: "Gd" }, { id: "opt2", text: "Go" }, { id: "opt3", text: "Ag" }, { id: "opt4", text: "Au" }],
        },
        // ... add more questions to test scrolling ...
        { id: "q6", questionText: "Filler question 6 to test scrolling.", options: [{id:"a", text:"A"},{id:"b", text:"B"}] },
        { id: "q7", questionText: "Filler question 7.", options: [{id:"a", text:"A"},{id:"b", text:"B"}] },
        { id: "q8", questionText: "Filler question 8.", options: [{id:"a", text:"A"},{id:"b", text:"B"}] },
        { id: "q9", questionText: "Filler question 9.", options: [{id:"a", text:"A"},{id:"b", text:"B"}] },
        { id: "q10", questionText: "Filler question 10.", options: [{id:"a", text:"A"},{id:"b", text:"B"}] },
    ]
};


// Helper to define status colors for palette
const STATUS_CLASSES = {
    not_visited: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
    not_answered: 'bg-red-500 text-white border-red-500',
    answered: 'bg-green-500 text-white border-green-500',
    marked_for_review: 'bg-purple-500 text-white border-purple-500',
    answered_marked_for_review: 'bg-purple-500 text-white border-purple-500 relative after:content-[""] after:absolute after:bottom-1 after:right-1 after:w-2 after:h-2 after:bg-green-300 after:rounded-full'
};

const TestEnginePage = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const testQuestions = mockTestData.questions;
    const totalQuestions = testQuestions.length;

    // --- STATES ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState(
        Array(totalQuestions).fill({ status: 'not_visited', selectedOptionId: null })
    );
    const [tempSelectedOption, setTempSelectedOption] = useState(null);
    // New State for Timer
    const [timeLeft, setTimeLeft] = useState(mockTestData.durationSecs);
    // New State for Mobile Palette toggle
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);


    const currentQuestion = testQuestions[currentQuestionIndex];

    // --- EFFECT 1: TIMER LOGIC ---
    const handleSubmitTest = useCallback(() => {
        // In real app, calculate score here and send to backend
        console.log("Final User Responses:", userResponses);
        console.log("Time Taken:", mockTestData.durationSecs - timeLeft, "seconds");
        alert("Test Submitted successfully! Redirecting to home...");
        navigate('/');
    }, [userResponses, timeLeft, mockTestData.durationSecs, navigate]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmitTest();
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, handleSubmitTest]);

    // Helper to format seconds to HH:MM:SS
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };


    // --- EFFECT 2: Load saved response on question change ---
    useEffect(() => {
        setTempSelectedOption(userResponses[currentQuestionIndex].selectedOptionId);
        if (userResponses[currentQuestionIndex].status === 'not_visited') {
            updateResponseState(currentQuestionIndex, 'not_answered', null);
        }
        // Close mobile palette on question change
        if(window.innerWidth < 768) {
            setIsPaletteOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex]);


    // --- Helper to update responses ---
    const updateResponseState = (index, status, optionId = null) => {
        const newResponses = [...userResponses];
        const finalOptionId = optionId !== null ? optionId : newResponses[index].selectedOptionId;
        newResponses[index] = { status: status, selectedOptionId: finalOptionId };
        setUserResponses(newResponses);
    };


    // --- HANDLERS ---
    const handleOptionSelect = (optionId) => {
        setTempSelectedOption(optionId);
    };

    const handleNextNavigation = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSaveAndNext = () => {
        if (tempSelectedOption) {
            updateResponseState(currentQuestionIndex, 'answered', tempSelectedOption);
        } else {
            updateResponseState(currentQuestionIndex, 'not_answered', null);
        }
        handleNextNavigation();
    };

    const handleMarkForReview = () => {
        if (tempSelectedOption) {
            updateResponseState(currentQuestionIndex, 'answered_marked_for_review', tempSelectedOption);
        } else {
            updateResponseState(currentQuestionIndex, 'marked_for_review', null);
        }
        handleNextNavigation();
    };

    const handleClearResponse = () => {
        setTempSelectedOption(null);
        updateResponseState(currentQuestionIndex, 'not_answered', null);
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handlePaletteClick = (index) => {
        setCurrentQuestionIndex(index);
    };


    return (
        <div className="h-screen flex flex-col bg-gray-100 font-sans overflow-hidden select-none relative">
            
            {/* === TOP HEADER === */}
            <header className="bg-blue-900 text-white p-3 md:p-4 flex justify-between items-center shadow-md z-20 relative">
                <div className="flex items-center">
                    {/* Mobile Menu Toggle Button */}
                    <button onClick={() => setIsPaletteOpen(true)} className="mr-3 md:hidden p-1 rounded hover:bg-blue-800">
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg md:text-xl font-bold truncate">{mockTestData.title}</h1>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Working Timer */}
                    <div className={`text-lg md:text-xl font-mono px-3 py-1 md:px-4 md:py-2 rounded-md border ${timeLeft < 300 ? 'bg-red-600 border-red-700 animate-pulse' : 'bg-blue-800 border-blue-500'}`}>
                        {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={handleSubmitTest}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md font-bold text-sm transition-colors hidden sm:block"
                    >
                        Submit
                    </button>
                </div>
            </header>


            {/* === MAIN CONTENT === */}
            <div className="grow flex overflow-hidden relative z-10">

                {/* --- LEFT SIDE: QUESTION AREA --- */}
                <main className="w-full md:w-3/4 p-4 md:p-6 overflow-y-auto bg-white pb-24 md:pb-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Question Header */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b pb-4 font-medium">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Question No. {currentQuestionIndex + 1}</h2>
                            <div className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
                                Marks: <span className="text-green-600">+2</span> / <span className="text-red-600">-0.5</span>
                            </div>
                        </div>

                        {/* Question Text */}
                        <div className="text-lg md:text-xl text-gray-900 mb-8 leading-relaxed font-medium">
                            {currentQuestion.questionText}
                        </div>

                        {/* Options */}
                        <div className="space-y-3 md:space-y-4">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = tempSelectedOption === option.id;
                                return (
                                    <label
                                        key={option.id}
                                        className={`flex items-center p-3 md:p-4 border-2 rounded-xl cursor-pointer transition-all group ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value={option.id}
                                            checked={isSelected}
                                            onChange={() => handleOptionSelect(option.id)}
                                            className="hidden"
                                        />
                                        <div className={`h-5 w-5 md:h-6 md:w-6 rounded-full border-2 flex items-center justify-center mr-3 md:mr-4 ${isSelected ? 'border-blue-600' : 'border-gray-400'}`}>
                                            {isSelected && <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-blue-600"></div>}
                                        </div>

                                        <span className={`text-base md:text-lg ${isSelected ? 'text-blue-900 font-medium' : 'text-gray-800'}`}>
                                            <span className="font-bold mr-2 md:mr-3 text-gray-500">({['A', 'B', 'C', 'D'][index]})</span> {option.text}
                                        </span>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                </main>


                {/* --- RIGHT SIDE: PALETTE (Responsive Drawer) --- */}
                 {/* Backdrop for mobile */}
                {isPaletteOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setIsPaletteOpen(false)}
                    ></div>
                )}
                
                <aside className={`
                        fixed inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out
                        ${isPaletteOpen ? 'translate-x-0' : 'translate-x-full'}
                        md:relative md:translate-x-0 md:flex md:w-1/4 md:z-auto
                    `}>
                    {/* Palette Header */}
                    <div className="p-4 bg-gray-50 border-b font-bold text-gray-800 flex justify-between items-center">
                        <span>Question Palette</span>
                        {/* Close button for mobile */}
                        <button onClick={() => setIsPaletteOpen(false)} className="md:hidden p-1 text-gray-500 hover:bg-gray-200 rounded">
                            <XMarkIcon className="h-6 w-6"/>
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="p-4 text-xs grid grid-cols-2 gap-y-3 gap-x-2 border-b bg-gray-50">
                        <div className="flex items-center"><span className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded mr-2"></span> Answered</div>
                        <div className="flex items-center"><span className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded mr-2"></span> Not Answered</div>
                        <div className="flex items-center"><span className="w-3 h-3 md:w-4 md:h-4 bg-gray-200 border border-gray-300 rounded mr-2"></span> Not Visited</div>
                        <div className="flex items-center"><span className="w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded mr-2"></span> Mark for Review</div>
                        <div className="flex items-center col-span-2"><span className="w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded mr-2 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:bg-green-300 after:rounded-full"></span> Ans & Marked</div>
                    </div>

                    {/* Grid of Numbers */}
                    <div className="p-4 grow overflow-y-auto custom-scrollbar pb-24 md:pb-4">
                        <div className="grid grid-cols-5 gap-2 md:gap-3">
                            {testQuestions.map((q, index) => {
                                const status = userResponses[index].status;
                                const colorClass = STATUS_CLASSES[status] || STATUS_CLASSES.not_visited;
                                const isActive = currentQuestionIndex === index;

                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => handlePaletteClick(index)}
                                        className={`h-10 w-10 md:h-11 md:w-11 rounded-lg flex items-center justify-center font-bold text-sm border transition-all ${colorClass} ${isActive ? 'ring-2 ring-offset-2 ring-blue-600 transform scale-105 shadow-lg' : ''
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </aside>
            </div>


            {/* === BOTTOM FOOTER (Fixed) === */}
            <footer className="bg-white p-3 md:p-4 border-t border-gray-200 flex flex-wrap justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 fixed bottom-0 w-full md:relative">
                <div className="flex space-x-2 md:space-x-4 mb-2 sm:mb-0 grow sm:grow-0 font-semibold text-sm md:text-base">
                    <button onClick={handleMarkForReview} className="flex-1 sm:flex-none px-2 md:px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-700 hover:bg-blue-50 transition-colors whitespace-nowrap">
                        Mark for Review
                    </button>
                    <button onClick={handleClearResponse} className="flex-1 sm:flex-none px-2 md:px-4 py-2 rounded-lg border-2 border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap">
                        Clear
                    </button>
                </div>

                <div className="flex space-x-2 md:space-x-4 grow sm:grow-0 text-sm md:text-base font-semibold">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg border-2 ${currentQuestionIndex === 0 ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleSaveAndNext}
                        className="flex-1 sm:flex-none px-4 md:px-8 py-2 rounded-lg font-bold text-white transition-all bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                        Save & Next
                    </button>
                     {/* Mobile submit button located in footer */}
                     <button
                        onClick={handleSubmitTest}
                        className="sm:hidden flex-1 px-4 py-2 rounded-lg font-bold text-white transition-all bg-red-600 hover:bg-red-700 shadow-md"
                    >
                        Submit
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default TestEnginePage;