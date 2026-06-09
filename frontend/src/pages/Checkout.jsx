import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder, createRazorpayOrder, verifyPayment } from '../services/api';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [processing, setProcessing] = useState(false);

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-deep-forest font-body pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="font-display text-4xl text-ivory mb-4">Checkout</h1>
          <p className="text-stone">Your cart is empty</p>
          <Link to="/plants" className="inline-block mt-4 text-emerald hover:underline">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!address.trim()) return;
    if (!user) {
      navigate('/login');
      return;
    }

    setProcessing(true);
    try {
      const { data: order } = await createOrder({ shippingAddress: address });
      const { data: payment } = await createRazorpayOrder({ orderId: order._id });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: payment.amount,
        currency: payment.currency,
        name: 'GreenCart',
        description: 'Plant Purchase',
        order_id: payment.id,
        handler: async (response) => {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order._id,
          });
          clearCart();
          navigate(`/order-success?id=${order._id}`);
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: '#34d399' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-ivory mb-12">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <div className="bg-surface rounded-2xl border border-surface-light p-6">
              <h2 className="font-display text-xl text-ivory mb-4">Shipping Address</h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full shipping address"
                rows={4}
                className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors resize-none"
              />
            </div>

            {!user && (
              <div className="bg-surface rounded-2xl border border-surface-light p-6">
                <p className="text-stone text-sm">
                  Please{' '}
                  <Link to="/login" className="text-emerald hover:underline">sign in</Link>
                  {' '}to complete your purchase
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="bg-surface rounded-2xl border border-surface-light p-6 sticky top-24">
              <h2 className="font-display text-xl text-ivory mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-stone truncate mr-2">
                      {item.plant?.name || 'Plant'} x{item.quantity}
                    </span>
                    <span className="text-ivory">₹{item.plant?.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-surface-light pt-4 flex justify-between">
                <span className="text-ivory font-medium">Total</span>
                <span className="text-emerald font-display text-xl">₹{getCartTotal()}</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={!address.trim() || !user || processing}
                className="w-full mt-6 bg-emerald hover:bg-emerald-dark disabled:bg-stone-dark disabled:cursor-not-allowed text-deep-forest font-medium py-3 rounded-xl transition-all duration-300"
              >
                {processing ? 'Processing...' : `Pay ₹${getCartTotal()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
