import React from 'react';
import TestCard from './TestCard';

const PopularStateTests = () => {
  const stateTestData = [
    {
      id: 1,
      title: 'UP Police Constable 2024',
      image: "https://res.cloudinary.com/dh85jgh9d/image/upload/v1760609256/download7_bb3qf2.jpg",
      totalTests: 150,
      pypCount: 20,
    },
    {
      id: 2,
      title: 'BPSC PT (Prelims) 2024',
      image: "https://res.cloudinary.com/dh85jgh9d/image/upload/v1760608993/download8_jkbhon.jpg",
      totalTests: 100,
      pypCount: 15,
    },
    {
      id: 3,
      title: 'REET Level 2 2024 Test Series',
      image: "https://res.cloudinary.com/dh85jgh9d/image/upload/v1760608993/download3_p7vmqj.png",
      totalTests: 120,
      pypCount: 10,
    },
    {
      id: 4,
      title: 'MP Patwari 2024 Test Series',
      image: "https://res.cloudinary.com/dh85jgh9d/image/upload/v1760609256/download7_bb3qf2.jpg",
      totalTests: 130,
      pypCount: 15,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
          Popular State Test Series
        </h2>
        <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-gray-500 mx-auto px-4">
          Ace your state-level exams with our specialized mock test series.
        </p>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          {stateTestData.map((test) => (
            <TestCard
              key={test.id}
              title={test.title}
              image={test.image}
              totalTests={test.totalTests}
              pypCount={test.pypCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularStateTests;
