import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginScreen from '../../src/screens/login/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Mock the LoginForm component since it's not the focus of this test file
jest.mock('../../components/login', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>LoginForm Component</div>;
    },
  };
});

// A helper function to render the component within the router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ui} />
        <Route path="/signup" element={<div>Signup Page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

describe('LoginScreen', () => {
  it('renders the LoginScreen component', () => {
    renderWithRouter(<LoginScreen />);
    expect(screen.getByText('Sign in?')).toBeInTheDocument();
    expect(screen.getByText('LoginForm Component')).toBeInTheDocument(); // Mocked LoginForm component text
  });

  it('navigates to /signup when the "New here?" button is clicked', () => {
    renderWithRouter(<LoginScreen />);

    fireEvent.click(screen.getByText(/new here\?/i));
    expect(screen.getByText('Signup Page')).toBeInTheDocument();
  });
});
