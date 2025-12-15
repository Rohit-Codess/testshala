import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = ({ image, title, totalTests, pypCount }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="h-36 sm:h-40 overflow-hidden bg-gray-50 flex items-center justify-center p-3 sm:p-4">
        <img src={image} alt={title} className="h-full w-auto object-contain max-w-full" />
      </div>

      <div className="p-4 sm:p-5 flex flex-col grow">
        <div className="mb-3 sm:mb-4 grow">
           <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-1.5">{title}</h3>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-400 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="whitespace-nowrap">{totalTests}+ Tests</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-400 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <span className="whitespace-nowrap">{pypCount}+ PYPs</span>
          </div>
        </div>

        <Link to="/" className="block w-full text-center text-blue-600 text-sm sm:text-base font-medium border border-blue-600 rounded-lg py-2 sm:py-2.5 hover:bg-blue-600 hover:text-white transition-colors">
          View Series
        </Link>
      </div>
    </div>
  );
};

export default TestCard;