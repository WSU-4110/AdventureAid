import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TravelAdvisoryComponent from './TravelAdvisoryComponent'; // Adjust the import path as needed
import '@testing-library/jest-dom';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      data: {
        "US": {
          advisory: {
            score: 3.5,
            message: "Moderate travel advisory in this region."
          }
        }
      }
    }),
  }),
);

beforeEach(() => {
  fetch.mockClear();
});

test('renders TravelAdvisoryComponent', () => {
  render(<TravelAdvisoryComponent />);
  expect(screen.getByPlaceholderText('Enter country code')).toBeInTheDocument();
});

test('loads and displays advisory data', async () => {
  render(<TravelAdvisoryComponent />);
  const input = screen.getByPlaceholderText('Enter country code');
  fireEvent.change(input, { target: { value: 'US' } });

  // Use findByText for each element
  expect(await screen.findByText('Country: US')).toBeInTheDocument();
  expect(await screen.findByText('Advisory Score: 3.5')).toBeInTheDocument();
  expect(await screen.findByText('Moderate travel advisory in this region.')).toBeInTheDocument();
});



test('displays loading message', async () => {
  fetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({ json: () => Promise.resolve({}) }), 100)));
  render(<TravelAdvisoryComponent />);
  const input = screen.getByPlaceholderText('Enter country code');
  fireEvent.change(input, { target: { value: 'US' } });

  expect(screen.getByText('Loading advisory data...')).toBeInTheDocument();
});

// Add more tests as needed...
