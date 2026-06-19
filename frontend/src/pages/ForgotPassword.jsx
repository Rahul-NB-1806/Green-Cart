import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const { data } = await forgotPassword(email);
      setMessage(data.message);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-surface rounded-2xl border border-surface-light p-8">
          <h2 className="font-display text-3xl text-ivory text-center">Forgot Password</h2>
          <p className="text-stone text-sm text-center mt-2">
            {sent
              ? 'Check your email for the reset link'
              : "Enter your email and we'll send you a reset link"
            }
          </p>

          {!sent ? (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-clay/10 border border-clay/10 rounded-xl px-4 py-3">
                  <p className="text-clay text-sm">{error}</p>
                </div>
              )}
              {message && (
                <div className="bg-emerald/10 border border-emerald/10 rounded-xl px-4 py-3">
                  <p className="text-emerald text-sm">{message}</p>
                </div>
              )}
              <div>
                <label className="block text-stone text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald hover:bg-emerald-dark text-deep-forest font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="mt-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-stone text-sm">
                If an account with that email exists, we've sent a password reset link.
              </p>
            </div>
          )}

          <p className="text-stone text-sm text-center mt-6">
            <Link to="/login" className="text-emerald hover:text-emerald-dark transition-colors">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
