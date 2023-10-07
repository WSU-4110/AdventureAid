import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from '../components/navbar/index';
import Home from '../screens/home/index';
import Destinations from '../screens/destinations';
import About from '../screens/about';
import Blog from '../screens/blog';
// ... import other page components

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        {/* ... add other routes here */}
      </Routes>
    </Router>
  );
}
