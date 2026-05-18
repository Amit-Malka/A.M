import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './components/Hero';

test('renders hero heading with name', () => {
  render(<Hero />);
  const heading = screen.getByRole('heading', { name: /Amit Malka/i });
  expect(heading).toBeInTheDocument();
});
