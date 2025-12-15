import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: 'What is TestShala and how can it help me?',
      answer: 'TestShala is an online learning platform that provides high-quality mock tests and test series for various competitive exams like SSC, Banking, Railways, and State Exams. Our tests are designed by experts to match the latest exam pattern and help you identify your strengths, weaknesses, and improve your all-India rank.',
    },
    {
      question: 'How do I access the test series after I purchase it?',
      answer: 'After purchasing a test series, you can access it directly from your dashboard. Simply log in to your account, go to "My Tests" section, and you will find all your purchased test series. You can start taking tests immediately after purchase.',
    },
    {
      question: 'Are the mock tests based on the latest exam pattern?',
      answer: 'Yes, all our mock tests are regularly updated to reflect the latest exam patterns and syllabi. Our expert team continuously monitors official notifications and updates the tests accordingly to ensure you get the most relevant practice material.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Have questions? We're here to help. Find answers to common queries about our test series and platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
