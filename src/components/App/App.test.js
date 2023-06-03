import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jammming header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Jammming/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders SearchBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});