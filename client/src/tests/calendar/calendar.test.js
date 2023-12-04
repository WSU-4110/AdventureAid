import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from '../../components/calendar/index';
import '@testing-library/jest-dom';

test('renders Calendar component', () => {
  render(<Calendar />);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; 
  expect(screen.getByText(formattedDate)).toBeInTheDocument();
});

