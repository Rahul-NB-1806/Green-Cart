import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

const mockRegister = jest.fn();

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({ register: mockRegister, user: null, loading: false }),
  AuthProvider: ({ children }) => children,
}));

beforeEach(() => mockRegister.mockClear());

test('register form submits name, email, and password to the register API', async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const nameInput = screen.getByPlaceholderText('Your full name');
  const emailInput = screen.getByPlaceholderText('you@example.com');
  const passwordInput = screen.getByPlaceholderText('Create a password');
  const confirmInput = screen.getByPlaceholderText('Confirm your password');
  const submitButton = screen.getByRole('button', { name: /register/i });

  fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
  fireEvent.change(emailInput, { target: { value: 'jane@greencart.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockRegister).toHaveBeenCalledWith('Jane Doe', 'jane@greencart.com', 'password123');
  });
});
