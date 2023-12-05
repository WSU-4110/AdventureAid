import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SignupForm from "../../src/components/signup/index"

// Mocking the navigate function provided by react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SignupForm', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );
  });

  it('should render the signup form with email and password fields', () => {
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make my account!/i })).toBeInTheDocument();
  });

  it('should allow entering email', () => {
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    expect(screen.getByLabelText(/email address/i)).toHaveValue('test@example.com');
  });

  it('should allow entering password', () => {
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
  });

  // You would need to mock the fetch call to test the form submission
  it('should submit the form', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Signup successful' }),
      })
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /make my account!/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    // You can add more assertions here to test the behavior after successful form submission
  });

  // Cleanup mock fetch after all tests are done
  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });
});
