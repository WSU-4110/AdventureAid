import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

// Mock child components
jest.mock('../../components/navbar', () => () => <div data-testid="navbar">Navbar Component</div>);
jest.mock('../../components/travel-advisory', () => () => <div data-testid="travel-advisor">TravelAdvisor Component</div>);
jest.mock('../../components/calendar', () => () => <div data-testid="calendar">Calendar Component</div>);

describe('Home Component', () => {
  it('renders Navbar and initial text', () => {
    render(<Home />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByText('Your Next Adventure Awaits')).toBeInTheDocument();
  });

  it('does not initially render TravelAdvisor or Calendar', () => {
    render(<Home />);
    expect(screen.queryByTestId('travel-advisor')).not.toBeInTheDocument();
    expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
  });

  it('renders TravelAdvisor and Calendar when "Start Planning" is clicked', () => {
    render(<Home />);
    fireEvent.click(screen.getByText(/start planning/i));
    expect(screen.getByTestId('travel-advisor')).toBeInTheDocument();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('hides "Start Planning" button after being clicked', () => {
    render(<Home />);
    const startPlanningButton = screen.getByText(/start planning/i);
    fireEvent.click(startPlanningButton);
    expect(startPlanningButton).not.toBeInTheDocument();
  });
});
