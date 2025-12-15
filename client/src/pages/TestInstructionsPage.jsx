// src/pages/TestInstructionsPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TestInstructionsPage = () => {
  // Mock data - in real app, fetch based on ID
  const testInfo = {
    title: "SSC CGL Tier 1 - Full Mock Test 1",
    duration: 60, // minutes
    totalQuestions: 100,
    totalMarks: 200,
    negativeMarking: 0.50,
  };

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  // We will use this ID later to start the specific test
  const { testId } = useParams();

  const handleStartTest = () => {
    if (isChecked) {
      // This is where we will eventually navigate to the main Test Engine page
      alert(`Starting Test ID: ${testId}. The full-screen test engine will be built in the next phase!`);
      // navigate('/take-test/' + testId); // Future route
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Main Content Area with fixed height for scrolling */}
      <div className="flex grow container mx-auto px-4 sm:px-6 lg:px-8 py-25 max-w-4xl">
        <div className="bg-white shadow rounded-xl overflow-hidden flex flex-col h-[calc(100vh-140px)]">
            
            {/* Header: Test Summary */}
            <div className="bg-blue-50 p-6 border-b border-blue-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{testInfo.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span className="flex items-center"><span className="font-semibold mr-1">Duration:</span> {testInfo.duration} Mins</span>
                    <span className="flex items-center"><span className="font-semibold mr-1">Questions:</span> {testInfo.totalQuestions}</span>
                    <span className="flex items-center"><span className="font-semibold mr-1">Total Marks:</span> {testInfo.totalMarks}</span>
                    <span className="flex items-center text-red-600"><span className="font-semibold mr-1">Negative Marking:</span> {testInfo.negativeMarking} Marks</span>
                </div>
            </div>

            {/* Scrollable Instructions Body */}
            <div className="grow p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-gray-800">General Instructions:</h2>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
                    <li>The clock has been set at the server and the countdown timer at the top right corner of your screen will display the time remaining for you to complete the exam.</li>
                    <li>The question palette at the right of screen shows one of the following statuses of each of the questions numbered:
                        <ul className="list-none pl-4 mt-2 space-y-1">
                            <li><span className="inline-block w-4 h-4 bg-gray-200 rounded-full mr-2 border"></span> You have not visited the question yet.</li>
                            <li><span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span> You have not answered the question.</li>
                            <li><span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span> You have answered the question.</li>
                            <li><span className="inline-block w-4 h-4 bg-purple-500 rounded-full mr-2"></span> You have NOT answered the question, but have marked the question for review.</li>
                        </ul>
                    </li>
                    <li>You can click on the "&gt;" arrow which appears to the left of question palette to collapse the question palette thereby maximizing the question window.</li>
                    <li>To answer a question, do the following:
                        <ul className="list-disc pl-6 mt-2">
                             <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly.</li>
                             <li>Click on <strong>Save & Next</strong> to save your answer for the current question and then go to the next question.</li>
                             <li>Click on <strong>Mark for Review & Next</strong> to save your answer for the current question, mark it for review, and then go to the next question.</li>
                        </ul>
                    </li>
                    <li>Note that your answer for the current question will not be saved if you navigate to another question directly by clicking on its number in the Question Palette without clicking 'Save & Next' or 'Mark for Review & Next'.</li>
                    {/* Add more placeholder text to make it scrollable */}
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                </ol>
            </div>

            {/* Fixed Bottom Footer: Agreement & Button */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between">
                <label className="flex items-center space-x-3 mb-4 sm:mb-0 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="text-gray-700 text-sm select-none">I have read and understood the instructions. I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action.</span>
                </label>
                <button 
                    onClick={handleStartTest}
                    disabled={!isChecked}
                    className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-white transition-colors shadow-md ${
                        isChecked 
                        ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Start Now
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default TestInstructionsPage;