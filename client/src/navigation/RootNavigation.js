import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import LoginScreen from '../screens/login/index';
import SignUpScreen from '../screens/signup';


import Home from '../screens/home/index';
import Destinations from '../screens/destinations';
import About from '../screens/about';
import Blog from '../screens/blog';
// ... import other page components

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true to simulate successful login
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            {/* ... add other routes here */}
          </Routes>
        </>
      ) : (
        
        <LoginScreen onLogin={handleLogin} />
        // <SignUpScreen />
      )}
    </Router>
  );
}
