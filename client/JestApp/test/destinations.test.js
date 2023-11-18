import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Destinations from '../../src/screens/destinations/index';

// Mock child components
jest.mock('../../components/navbar', () => {
  return {
    __esModule: true,
    default: () => <div>Navbar Component</div>,
  };
});

jest.mock('../../components/weather', () => {
  return {
    __esModule: true,
    default: () => <div>Weather Component</div>,
  };
});

jest.mock('../../components/maps/googlemaps.js', () => {
  return {
    __esModule: true,
    default: ({ searchPlaceInput, searchLocationInput }) => (
      <div>
        Map Component - Place: {searchPlaceInput}, Location: {searchLocationInput}
      </div>
    ),
  };
});

jest.mock('../../components/autocomplete/autocomplete.js', () => {
  return {
    __esModule: true,
    default: ({ onPlaceSearch, onLocationSearch }) => (
      <div>
        <button onClick={() => onPlaceSearch('Test Place')}>Set Place</button>
        <button onClick={() => onLocationSearch('Test Location')}>Set Location</button>
      </div>
    ),
  };
});

describe('Destinations Component', () => {
  it('renders child components', () => {
    render(<Destinations />);
    expect(screen.getByText('Navbar Component')).toBeInTheDocument();
    expect(screen.getByText('Weather Component')).toBeInTheDocument();
    expect(screen.getByText(/Map Component/)).toBeInTheDocument();
  });

  it('passes initial state to MapComponent', () => {
    render(<Destinations />);
    expect(screen.getByText('Map Component - Place: , Location: ')).toBeInTheDocument();
  });

  it('updates state when SimpleSearchBar handlers are called', () => {
    render(<Destinations />);
    fireEvent.click(screen.getByText('Set Place'));
    fireEvent.click(screen.getByText('Set Location'));
    expect(screen.getByText('Map Component - Place: Test Place, Location: Test Location')).toBeInTheDocument();
  });
});
