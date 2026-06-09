import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      try {
        const { data } = await getUserOrders();
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-deep-forest font-body pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="font-display text-4xl text-ivory mb-4">My Orders</h1>
          <p className="text-stone">Please sign in to view your orders</p>
          <Link to="/login" className="inline-block mt-4 text-emerald hover:underline">Sign In</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-forest font-body pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="animate-pulse text-stone">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-ivory mb-12">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone text-lg">No orders yet</p>
            <Link to="/plants" className="inline-block mt-4 text-emerald hover:underline">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-surface rounded-2xl border border-surface-light p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-stone-dark text-xs">Order #{order._id.slice(-8)}</p>
                    <p className="text-stone-dark text-xs mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                    order.orderStatus === 'delivered' ? 'bg-emerald/10 text-emerald' :
                    order.orderStatus === 'cancelled' ? 'bg-clay/10 text-clay' :
                    'bg-gold/10 text-gold'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items?.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-stone">{item.plant?.name || 'Plant'} x{item.quantity}</span>
                      <span className="text-ivory">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-surface-light pt-4 flex justify-between items-center">
                  <p className="text-stone-dark text-xs">Payment: {order.paymentStatus}</p>
                  <p className="text-emerald font-display text-xl">₹{order.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
