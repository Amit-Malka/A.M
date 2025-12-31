import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('@vercel/analytics/react');

// Smoke test - just ensure the App renders without crashing
// The app uses lazy loading and doesn't have text that matches /learn react/i
test('renders app component', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toBeTruthy();
});
