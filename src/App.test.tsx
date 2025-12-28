import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  const actual = jest.requireActual('framer-motion');

  const MotionComponent = React.forwardRef(({ children, ...props }: any, ref: any) => {
    // Filter out framer-motion specific props that cause warnings in tests
    const {
      initial, animate, exit, variants, transition,
      whileHover, whileTap, whileInView, whileDrag, whileFocus,
      viewport, custom, onAnimationStart, onAnimationComplete, onLayoutAnimationStart, onLayoutAnimationComplete,
      ...validProps
    } = props;

    // Convert tag name to string if it's a motion component like motion.div
    // But since we are mocking motion.div explicitly below, we can just return a div or whatever
    return <div ref={ref} {...validProps}>{children}</div>;
  });

  return {
    ...actual,
    motion: {
      div: React.forwardRef((props: any, ref: any) => <MotionComponent {...props} ref={ref} />),
      section: React.forwardRef((props: any, ref: any) => <section {...props} ref={ref} />),
      h1: React.forwardRef((props: any, ref: any) => <h1 {...props} ref={ref} />),
      h2: React.forwardRef((props: any, ref: any) => <h2 {...props} ref={ref} />),
      p: React.forwardRef((props: any, ref: any) => <p {...props} ref={ref} />),
      button: React.forwardRef((props: any, ref: any) => <button {...props} ref={ref} />),
      a: React.forwardRef((props: any, ref: any) => <a {...props} ref={ref} />),
      span: React.forwardRef((props: any, ref: any) => <span {...props} ref={ref} />),
      nav: React.forwardRef((props: any, ref: any) => <nav {...props} ref={ref} />),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

test('renders Amit Malka text', async () => {
  await act(async () => {
    render(<App />);
  });

  // Use getAllByText because the name appears multiple times (Header and Hero)
  const nameElements = await screen.findAllByText(/Amit Malka/i);
  expect(nameElements.length).toBeGreaterThan(0);
  expect(nameElements[0]).toBeInTheDocument();
});
