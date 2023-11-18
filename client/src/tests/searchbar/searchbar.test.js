import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../client/src/components/searchbar/index'; 

test('renders SearchBar component', () => {
  render(<SearchBar label="Search" />);
  expect(screen.getByText('Search')).toBeInTheDocument();
});

test('allows user to input text', () => {
  const handleChange = jest.fn();
  render(<SearchBar onChange={handleChange} label="Search" />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test query' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
