import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from '../theme/ThemeProvider';

test('renders theme toggle', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
  expect(screen.getByRole('button', { name: /toggle (dark|light) mode/i })).toBeInTheDocument();
});
