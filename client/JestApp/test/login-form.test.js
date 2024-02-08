import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../src/components/login/index'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mocking axios post request
jest.mock('axios');

// Mocking navigate function from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    // Mock implementation before each test
    axios.post.mockImplementation(() => Promise.resolve({ data: { Token: 'mockToken' } }));
  });

  test('renders LoginForm component', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  });

  test('allows the user to enter email and password and submit the form', async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/loginuser', {
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  // Additional tests can be written to check for error handling, remember me functionality, and navigation after successful login
});
