import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the GreenCart brand name in the navbar', () => {
  render(<App />);
  const brand = screen.getByRole('link', { name: 'Green Cart' });
  expect(brand).toBeInTheDocument();
});
