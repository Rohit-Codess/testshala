import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
              Your One Stop Solution for <span className="text-blue-600">All Exam Preparations</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Get access to unlimited mock tests, previous year papers, and study notes for over 700 exams.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all">
                View All Test Series
              </a>
            </div>
          </div>

          <div className="relative">
            <img src="/hero-illustration.png" alt="Exam preparation illustration" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;