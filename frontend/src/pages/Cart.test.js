import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';

const mockUseCart = jest.fn();

jest.mock('../context/CartContext', () => ({
  useCart: () => mockUseCart(),
}));

beforeEach(() => {
  mockUseCart.mockReset();
});

test('displays the cart total when items have prices', () => {
  mockUseCart.mockReturnValue({
    cart: {
      items: [
        { _id: '1', plant: { _id: 'p1', name: 'Snake Plant', price: 499 }, quantity: 2 },
        { _id: '2', plant: { _id: 'p2', name: 'Aloe Vera', price: 349 }, quantity: 1 },
      ],
    },
    loading: false,
    updateItem: jest.fn(),
    removeItem: jest.fn(),
    getCartTotal: () => 499 * 2 + 349 * 1,
  });

  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );

  expect(screen.getByText('₹1347')).toBeInTheDocument();
});

test('shows ₹0 for items and total when cart items have no price data', () => {
  mockUseCart.mockReturnValue({
    cart: {
      items: [
        { _id: '1', plant: { _id: 'p1' }, quantity: 2 },
      ],
    },
    loading: false,
    updateItem: jest.fn(),
    removeItem: jest.fn(),
    getCartTotal: () => 0,
  });

  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );

  const zeroAmounts = screen.getAllByText('₹0');
  expect(zeroAmounts.length).toBeGreaterThanOrEqual(1);
});

test('individual item total does not show NaN for items without price', () => {
  mockUseCart.mockReturnValue({
    cart: {
      items: [
        { _id: '1', plant: { _id: 'p1' }, quantity: 2 },
      ],
    },
    loading: false,
    updateItem: jest.fn(),
    removeItem: jest.fn(),
    getCartTotal: () => 0,
  });

  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );

  const perItemPrices = screen.getAllByText(/^₹/);
  perItemPrices.forEach(el => {
    expect(el.textContent).not.toBe('₹NaN');
  });
});
