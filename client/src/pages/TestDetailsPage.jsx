// src/pages/TestDetailsPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// import headerImg from '../assets/test_ssc_cgl.png';

// MOCK DATA for a specific test series (e.g., SSC CGL)
const mockTestData = {
  id: 1,
  title: "SSC CGL Tier 1 2024 Test Series",
  description:
    "Prepare for SSC CGL Tier 1 with India's best test series based on the latest pattern. Get access to high-quality mock tests created by experts.",
  stats: {
    totalTests: 250,
    freeTests: 5,
    totalStudents: "1.5L+",
    language: "English, Hindi",
  },
  price: 299,
  // Sample syllabus structure
  syllabus: [
    {
      sectionTitle: "General Intelligence & Reasoning",
      tests: [
        {
          id: 101,
          title: "Full Mock Test 1",
          type: "Free",
          questions: 25,
          marks: 50,
          duration: 15,
        },
        {
          id: 102,
          title: "Full Mock Test 2",
          type: "Locked",
          questions: 25,
          marks: 50,
          duration: 15,
        },
        {
          id: 103,
          title: "Analogy Practice Test",
          type: "Locked",
          questions: 20,
          marks: 40,
          duration: 12,
        },
      ],
    },
    {
      sectionTitle: "General Awareness",
      tests: [
        {
          id: 201,
          title: "GA Full Mock 1",
          type: "Locked",
          questions: 25,
          marks: 50,
          duration: 10,
        },
        {
          id: 202,
          title: "Current Affairs Jan 2024",
          type: "Locked",
          questions: 30,
          marks: 30,
          duration: 15,
        },
      ],
    },
    // Add more sections like Quantitative Aptitude, English Comprehension here...
  ],
};

const TestDetailsPage = () => {
  // We will use this ID later to fetch real data. For now, we just use mockTestData.
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const test = mockTestData; // Using mock data

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header Banner */}
      <div className="bg-blue-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left info */}
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h1 className="text-3xl font-bold mb-4">{test.title}</h1>
            <p className="text-blue-100 text-lg mb-6">{test.description}</p>

            {/* Stats Badges */}
            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                📄 {test.stats.totalTests} Total Tests
              </span>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm flex items-center">
                🆓 {test.stats.freeTests} Free Tests
              </span>
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                👥 {test.stats.totalStudents} Students
              </span>
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                🗣️ {test.stats.language}
              </span>
            </div>
          </div>
          {/* Right Image - Hidden on small, visible on large */}
          <div className="hidden lg:block md:w-1/3 pl-8">
            <img
              src="https://res.cloudinary.com/dh85jgh9d/image/upload/v1760609256/download7_bb3qf2.jpg"
              alt={test.title}
              className="h-48 object-contain bg-white rounded-xl p-4"
            />
          </div>
        </div>
      </div>

      {/* Main Content Container with Sidebar layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column (Tabs & Syllabus Content) - Spans 8 columns */}
          <main className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Simple Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6 flex space-x-8">
              <button
                className={`pb-4 font-medium text-lg ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Tests & Syllabus
              </button>
              <button
                className={`pb-4 font-medium text-lg ${
                  activeTab === "reviews"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Map through syllabus sections */}
                  {test.syllabus.map((section, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {/* Section Header */}
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-semibold text-gray-800">
                        {section.sectionTitle}
                      </div>
                      {/* List of Tests in this section */}
                      <div className="divide-y divide-gray-200">
                        {section.tests.map((testItem) => (
                          <div
                            key={testItem.id}
                            className="px-4 py-4 flex justify-between items-center hover:bg-gray-50"
                          >
                            <div>
                              <div className="font-medium text-gray-900 flex items-center">
                                {testItem.type === "Free" ? (
                                  <span className="text-green-600 mr-2">
                                    FREE
                                  </span>
                                ) : (
                                  <span className="text-gray-400 mr-2">🔒</span>
                                )}
                                {testItem.title}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {testItem.questions} Ques | {testItem.marks}{" "}
                                Marks | {testItem.duration} Mins
                              </div>
                            </div>
                            <div>
                              {testItem.type === "Free" ? (
                                <Link
                                  to={`/test-instructions/${testItem.id}`} // Links to the new page with the specific test ID
                                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium inline-block"
                                >
                                  Start Test
                                </Link>
                              ) : (
                                <span className="text-gray-400 font-medium px-4 py-2">
                                  Unlock
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="text-gray-600 text-center py-8">
                  Reviews coming soon...
                </div>
              )}
            </div>
          </main>

          {/* Right Column (Sticky Buy Now Widget) - Spans 4 columns */}
          <aside className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Unlock All Tests
              </h2>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{test.price}
                </span>
                <span className="text-gray-500 ml-2 line-through">₹999</span>
                <span className="text-green-600 ml-2 font-medium">70% OFF</span>
              </div>

              <ul className="text-sm text-gray-600 space-y-3 mb-6">
                <li className="flex items-center">
                  ✅ Access to {test.stats.totalTests} Mock Tests
                </li>
                <li className="flex items-center">
                  ✅ Based on Latest Exam Pattern
                </li>
                <li className="flex items-center">
                  ✅ Detailed Solutions & Analysis
                </li>
                <li className="flex items-center">✅ Valid for 1 Year</li>
              </ul>

              <Link
                to="/login"
                className="block w-full text-center bg-green-600 text-white font-bold text-lg py-4 rounded-lg hover:bg-green-700 transition-shadow shadow-md hover:shadow-lg"
              >
                Buy Now
              </Link>
              <p className="text-xs text-center text-gray-500 mt-3">
                Secure payment via Razorpay
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TestDetailsPage;
