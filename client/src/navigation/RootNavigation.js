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
// ... import other page components

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true to simulate successful login
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
          <Route path="/user-profile" element={<UserProfile />} />
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
