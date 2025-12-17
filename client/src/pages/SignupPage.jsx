// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Import axios for API calls
import axios from 'axios';
import Navbar from '../components/Navbar';
import signupImg from '/hero-illustration.png';
// 2. Import the Auth Hook to manage user state globally
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 3. Add state for error handling and loading status
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { fullName, email, password, confirmPassword } = formData;

  // Hooks for navigation and auth
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  // >>> REAL BACKEND SUBMISSION LOGIC <<<
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
       setError("Passwords do not match");
       return;
    }

    try {
      setIsLoading(true);
      // 4. Make API call to the backend
      // Note: We map 'fullName' to 'name' to match the backend model expected format
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: fullName,
        email,
        password,
      });

      // 5. On success: Log the user in globally using context and redirect to home
      login(response.data);
      alert("Account created successfully!");
      navigate('/');

    } catch (err) {
      // 6. Handle errors (e.g., User already exists)
      // We try to get the specific message sent from the backend, fallback to generic message
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading spinner regardless of outcome
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8 bg-white rounded-2xl shadow-xl overflow-hidden flex">
          {/* Left Side - Image (Hidden on small screens) */}
          <div className="hidden md:block w-1/2 bg-blue-50 relative overflow-hidden">
             <img
                src={signupImg}
                alt="Sign Up Illustration"
                className="absolute inset-0 w-full h-full object-cover object-center p-8"
             />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-12">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in instead
                </Link>
              </p>
            </div>

             {/* 7. Display Error Alert if exists */}
             {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm spacing-y-4">
                {/* Inputs remain the same */}
                <div className="mb-4">
                  <label htmlFor="fullName" className="sr-only">Full Name</label>
                  <input id="fullName" name="fullName" type="text" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Full Name" value={fullName} onChange={onChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={onChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={onChange} />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={confirmPassword} onChange={onChange} />
                </div>
              </div>

              <div>
                {/* 8. Update button state based on isLoading */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;