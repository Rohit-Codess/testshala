// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get user state and logout function from global auth context
  const { user, logout } = useAuth();

  // Handler for the logout process
  const handleLogout = () => {
    logout(); // Call context logout function (clears local storage and state)
    setIsOpen(false); // Ensure mobile menu is closed
    navigate('/'); // Redirect user to home page
  };

  // >>> NEW HELPER FUNCTION <<<
  // Function to close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white relative w-full z-20 top-0 start-0 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo (Left) */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Testshala</span>
              <img className="h-8 w-auto sm:h-10" src="/logo.jpg" alt="Testshala Logo" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open menu</span>
              {/* Icon for menu closed (Hamburger) */}
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon for menu open (X) */}
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links (Center) - Hidden on mobile */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors">Test Series</Link>
            <Link to="/" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors">Current Affairs</Link>
            {/* Conditionally show Dashboard link only if logged in */}
            {user && (
                 <Link to="/dashboard" className="text-base font-medium text-blue-600 hover:text-blue-800 transition-colors">My Dashboard</Link>
            )}
          </nav>

          {/* Desktop Auth Buttons (Right) - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 z-50">
            {user ? (
              // State 1: User is Logged In
              <div className="flex items-center space-x-4">
                {/* Show first name, truncated if too long */}
                <span className="text-gray-700 font-medium truncate max-w-37.5" title={user.name}>
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button 
                  onClick={handleLogout}
                  className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              // State 2: User is NOT Logged In
              <Link to="/login" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 py-2 border border-blue-600 rounded-full shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-blue-50 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`${isOpen ? 'block' : 'hidden'} absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-30`}>
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img className="h-8 w-auto" src="/logo.jpg" alt="Testshala" />
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span className="sr-only">Close menu</span>
                  {/* Heroicon name: outline/x */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {/* >>> UPDATE: Added handleLinkClick to close menu on click <<< */}
                <Link to="/" onClick={handleLinkClick} className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">Home</span>
                </Link>
                <Link to="/" onClick={handleLinkClick} className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">Test Series</span>
                </Link>
                 {user && (
                     <Link to="/dashboard" onClick={handleLinkClick} className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                        <span className="ml-3 text-base font-medium text-blue-600">My Dashboard</span>
                     </Link>
                 )}
              </nav>
            </div>
          </div>
          
          {/* Mobile Auth Section Footer */}
          <div className="py-6 px-5 space-y-6">
            {user ? (
               // Mobile State 1: Logged In
               <div className="grid grid-cols-2 gap-y-4 gap-x-4 items-center">
                  <div className="text-base font-medium text-gray-900 truncate text-center" title={user.name}>
                      Hi, {user.name.split(' ')[0]}
                  </div>
                 <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
               </div>
            ) : (
                // Mobile State 2: NOT Logged In
                // handleLinkClick added here too just in case
                <Link to="/login" onClick={handleLinkClick} className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 rounded-full shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-blue-50 transition-colors">
                  Login
                </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;