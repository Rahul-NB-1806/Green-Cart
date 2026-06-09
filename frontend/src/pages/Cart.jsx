import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, loading, updateItem, removeItem, getCartTotal } = useCart();
  const items = cart?.items || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-forest font-body pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="animate-pulse text-stone">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-deep-forest font-body pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="font-display text-5xl text-ivory">Your Cart</h1>
          <svg className="w-16 h-16 mx-auto my-8 text-stone/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <p className="text-stone text-lg">Your cart is empty</p>
          <p className="text-stone-dark text-sm mt-2">Looks like you haven't added any plants yet</p>
          <Link to="/plants" className="inline-block mt-6 text-emerald hover:text-emerald-light underline transition-colors">
            Start Shopping &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-ivory mb-12">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item) => {
            const plant = item.plant || {};
            const price = Number(plant.price) || 0;
            const itemTotal = price * (item.quantity || 0);

            return (
              <div key={item._id} className="bg-surface rounded-2xl border border-surface-light p-5 flex items-center gap-6">
                <div className="w-20 h-20 bg-surface-lighter rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {plant.image ? (
                    <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-stone/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link to={`/plants/${plant._id}`} className="font-display text-ivory hover:text-emerald transition-colors">
                    {plant.name || 'Plant'}
                  </Link>
                  <p className="text-stone-dark text-sm mt-0.5">₹{price} each</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => item.quantity > 1 && updateItem(item._id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-surface-lighter text-stone hover:text-ivory transition-colors flex items-center justify-center disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    &minus;
                  </button>
                  <span className="text-ivory w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateItem(item._id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-surface-lighter text-stone hover:text-ivory transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <div className="text-right w-24">
                  <p className="text-emerald font-display text-lg">₹{itemTotal}</p>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="text-stone-dark hover:text-clay transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 bg-surface rounded-2xl border border-surface-light p-6 flex items-center justify-between">
          <div>
            <p className="text-stone-dark text-sm">Total</p>
            <p className="text-emerald font-display text-3xl">₹{getCartTotal()}</p>
          </div>
          <Link
            to="/checkout"
            className="bg-emerald hover:bg-emerald-dark text-deep-forest font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]"
          >
            Checkout &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
