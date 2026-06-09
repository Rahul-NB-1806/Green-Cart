import { Link, useSearchParams } from 'react-router-dom';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-5xl text-ivory mb-4">Order Placed!</h1>
        <p className="text-stone text-lg mb-2">Thank you for your purchase</p>
        {orderId && (
          <p className="text-stone-dark text-sm mb-8">Order ID: {orderId}</p>
        )}
        <p className="text-stone mb-8 max-w-md mx-auto">
          You'll receive a confirmation email shortly. Your plants will be carefully packed and shipped to your address.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/orders"
            className="bg-surface text-ivory border border-surface-light px-6 py-3 rounded-xl hover:border-emerald/30 transition-all"
          >
            View Orders
          </Link>
          <Link
            to="/plants"
            className="bg-emerald text-deep-forest px-6 py-3 rounded-xl hover:bg-emerald-dark transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
