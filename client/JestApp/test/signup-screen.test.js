import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpScreen from '../../src/screens/signup/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Mock the SignupForm component since it's not the focus of this test file
jest.mock('../../components/signup', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>SignupForm Component</div>;
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
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

describe('SignUpScreen', () => {
  it('renders the SignUpScreen component', () => {
    renderWithRouter(<SignUpScreen />);
    expect(screen.getByText('Already Have an Account?')).toBeInTheDocument();
    expect(screen.getByText('SignupForm Component')).toBeInTheDocument(); // Mocked SignupForm component text
  });

  it('navigates to /login when the "Sign in" button is clicked', () => {
    renderWithRouter(<SignUpScreen />);

    fireEvent.click(screen.getByText(/sign in/i));
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
