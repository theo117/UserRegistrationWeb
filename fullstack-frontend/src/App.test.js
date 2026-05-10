import { render, screen } from '@testing-library/react';
import App from './App';

test('renders user registry navigation', () => {
  render(<App />);
  const linkElement = screen.getByText(/user registry/i);
  expect(linkElement).toBeInTheDocument();
});
