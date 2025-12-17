// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('testshala_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Function to log in the user (save to state and local storage)
  const login = (userData) => {
    localStorage.setItem('testshala_user', JSON.stringify(userData));
    setUser(userData);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('testshala_user');
    setUser(null);
  };

  // Value to provide to the rest of the app
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // true if user exists, false otherwise
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};