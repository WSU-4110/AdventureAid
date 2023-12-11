import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginScreen from '../screens/login/index';
import SignUpScreen from '../screens/signup';

import Home from '../screens/home/index';
import Destinations from '../screens/destinations';
import Budget from '../screens/budget';
import About from '../screens/about';
import Blog from '../screens/blog';
import UserProfile from '../screens/user-profile';
import FAQ from '../screens/FAQ/faq';
import { useNavigate } from 'react-router-dom';
// ... import other page components

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const handleLogin = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true to simulate successful login
  };

  const handleSignout = () => {
     setIsLoggedIn(false);
    
};


  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/user-profile" element={<UserProfile onSignout={handleSignout} />} />
          <Route path="/faq" element={<FAQ />} />
          {/* ... add other routes here */}
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUpScreen />} />
          {/* Redirect to /signup if no other route is matched */}
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      )}
    </Router>
  );
}
