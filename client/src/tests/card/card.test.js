import React from 'react';
import { render, screen } from '@testing-library/react';
import CardComponent from '../../../client/src/components/card/index';
import '@testing-library/jest-dom';

const mockData = {
  imageUrl: 'https://example.com/image.jpg',
  title: 'Test Title',
  description: 'Test Description',
  author: 'Test Author',
  likes: 100,
  views: 200,
};

test('renders CardComponent', () => {
  render(<CardComponent {...mockData} />);
  expect(screen.getByText(mockData.title)).toBeInTheDocument();
  expect(screen.getByText(mockData.description)).toBeInTheDocument();
  expect(screen.getByText(mockData.author)).toBeInTheDocument();
  expect(screen.getByText(`❤️ ${mockData.likes}`)).toBeInTheDocument();
  expect(screen.getByText(`👁️ ${mockData.views}`)).toBeInTheDocument();
  expect(screen.getByAltText(mockData.title)).toHaveAttribute('src', mockData.imageUrl);
});


