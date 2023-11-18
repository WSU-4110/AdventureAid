import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherComponent from '../../components/weather/index'; 
import '@testing-library/jest-dom';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      // mock weather data response
      temperature: 68,
      humidity: 50,
      wind: 5,
      weather: 'clear sky',
      city: 'Test City',
    }),
  }),
);

beforeEach(() => {
  fetch.mockClear();
});

test('renders WeatherComponent', () => {
  render(<WeatherComponent />);
  expect(screen.getByText('Enter City:')).toBeInTheDocument();
});

test('displays loading message when fetching data', () => {
  render(<WeatherComponent />);
  const searchIcon = screen.getByRole('button');
  fireEvent.click(searchIcon);

  expect(screen.getByText('Loading weather data...')).toBeInTheDocument();
});

test('displays weather data after fetch', async () => {
  render(<WeatherComponent />);
  const searchIcon = screen.getByRole('button');
  fireEvent.click(searchIcon);

  // Use findByText for each element
  expect(await screen.findByText('Test City')).toBeInTheDocument();
  expect(await screen.findByText(/68°F/)).toBeInTheDocument();
  expect(await screen.findByText('Humidity: 50%')).toBeInTheDocument();
  expect(await screen.findByText('Wind: 5 mph')).toBeInTheDocument();
});



test('handles fetch error', async () => {
  fetch.mockImplementationOnce(() => Promise.reject('API is down'));

  render(<WeatherComponent />);
  const searchIcon = screen.getByRole('button');
  fireEvent.click(searchIcon);

  await waitFor(() => {
    expect(screen.getByText(/API is down/)).toBeInTheDocument();
  });
});

// Add more tests as needed...
