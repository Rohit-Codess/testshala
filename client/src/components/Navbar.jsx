import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
              <Link to="/" className="flex items-center">
                <span className="sr-only">Testshala</span>
                <img className="h-14 md:h-16 lg:h-14 xl:h-16 w-auto" src="/logo.jpg" alt="Testshala Logo" />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="text-sm xl:text-base font-medium text-blue-600 hover:text-blue-600 border-b-2 border-blue-600 pb-1 whitespace-nowrap">
                Home
              </Link>
              <Link to="/" className="text-sm xl:text-base font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap">
                Test Series
              </Link>
              <Link to="/" className="text-sm xl:text-base font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap">
                Current Affairs
              </Link>
              <Link to="/" className="text-sm xl:text-base font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap">
                Downloads
              </Link>
              <Link to="/" className="text-sm xl:text-base font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap">
                State Exams
              </Link>
              <Link to="/" className="text-sm xl:text-base font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap">
                Cart
              </Link>
            </nav>

            <div className="flex items-center">
              <Link to="/login" className="whitespace-nowrap inline-flex items-center justify-center px-4 md:px-6 py-2 border border-blue-600 rounded-full text-sm md:text-base font-medium text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <img className="h-8 w-auto" src="/logo.jpg" alt="Testshala" />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
            >
              Home
            </Link>
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Test Series
            </Link>
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Current Affairs
            </Link>
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Downloads
            </Link>
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              State Exams
            </Link>
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cart
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 border border-blue-600 rounded-full text-base font-medium text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;