import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TestDetailsPage from './pages/TestDetailsPage';
import TestInstructionsPage from './pages/TestInstructionsPage';
import TestEnginePage from './pages/TestEnginePage';

function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/test-series/:id" element={<TestDetailsPage />} />
          <Route path="/test-instructions/:testId" element={<TestInstructionsPage />} />
          <Route path="/take-test/:testId" element={<TestEnginePage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;