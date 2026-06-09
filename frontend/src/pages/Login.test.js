import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const mockLogin = jest.fn();

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin, user: null, loading: false }),
  AuthProvider: ({ children }) => children,
}));

beforeEach(() => mockLogin.mockClear());

test('login form submits email and password to the login API', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText('you@example.com');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: 'test@greencart.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('test@greencart.com', 'password123');
  });
});
