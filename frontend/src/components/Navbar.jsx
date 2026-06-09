import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-forest/80 backdrop-blur-md border-b border-surface-light">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-ivory">
          Green<span className="text-emerald">Cart</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-stone text-sm">
          <Link to="/" className="hover:text-emerald transition-colors">Home</Link>
          <Link to="/plants" className="hover:text-emerald transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-emerald transition-colors">About</Link>
          <Link to="/contact" className="hover:text-emerald transition-colors">Contact</Link>

          <Link to="/cart" className="relative hover:text-emerald transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald text-deep-forest text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/orders" className="hover:text-emerald transition-colors">Orders</Link>
              <span className="text-emerald text-sm">{user.name}</span>
              <button onClick={logout} className="text-stone-dark hover:text-clay transition-colors text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-emerald text-deep-forest px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-light transition-colors">Sign In</Link>
          )}
        </div>

        <button className="md:hidden text-ivory" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface border-t border-surface-light px-6 py-4 flex flex-col gap-4 text-stone text-sm">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-emerald transition-colors">Home</Link>
          <Link to="/plants" onClick={() => setOpen(false)} className="hover:text-emerald transition-colors">Shop</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="hover:text-emerald transition-colors">About</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-emerald transition-colors">Contact</Link>
          <Link to="/cart" onClick={() => setOpen(false)} className="hover:text-emerald transition-colors">Cart</Link>
          {user ? (
            <button onClick={() => { logout(); setOpen(false); }} className="text-left text-clay hover:text-clay-light transition-colors">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="bg-emerald text-deep-forest px-4 py-2 rounded-lg text-center font-medium">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}
