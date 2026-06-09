import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const getGuestCart = () => {
    const stored = localStorage.getItem('guestCart');
    return stored ? JSON.parse(stored) : { items: [] };
  };

  const saveGuestCart = (cartData) => {
    localStorage.setItem('guestCart', JSON.stringify(cartData));
    setCart(cartData);
  };

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart(getGuestCart());
      return;
    }
    setLoading(true);
    try {
      const { data } = await getCart();
      setCart(data);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = async (plantId, quantity = 1, plantData = null) => {
    if (!user) {
      const guestCart = getGuestCart();
      const existing = guestCart.items.find(i => i.plant === plantId || i.plant?._id === plantId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        const plant = plantData || { _id: plantId };
        guestCart.items.push({ plant, quantity, _id: Date.now().toString() });
      }
      saveGuestCart(guestCart);
      return;
    }
    const { data } = await addToCart({ plantId, quantity });
    setCart(data);
  };

  const updateItem = async (itemId, quantity) => {
    if (!user) {
      const guestCart = getGuestCart();
      const item = guestCart.items.find(i => i._id === itemId);
      if (item) item.quantity = quantity;
      saveGuestCart(guestCart);
      return;
    }
    const { data } = await updateCartItem(itemId, { quantity });
    setCart(data);
  };

  const removeItem = async (itemId) => {
    if (!user) {
      const guestCart = getGuestCart();
      guestCart.items = guestCart.items.filter(i => i._id !== itemId);
      saveGuestCart(guestCart);
      return;
    }
    const { data } = await removeCartItem(itemId);
    setCart(data);
  };

  const clearCart = () => {
    setCart({ items: [] });
    localStorage.removeItem('guestCart');
  };

  const getCartCount = () => {
    return cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  const getCartTotal = () => {
    return cart.items.reduce((sum, item) => {
      const price = item.plant?.price || 0;
      return sum + price * (item.quantity || 0);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, clearCart, getCartCount, getCartTotal, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export default CartProvider;
