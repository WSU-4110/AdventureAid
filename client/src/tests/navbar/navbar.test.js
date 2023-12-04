import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../../../client/src/components/navbar/index'; 


test('renders Navbar component', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Destinations')).toBeInTheDocument();
  // Continue for other items
});
