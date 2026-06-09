import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-surface rounded-2xl border border-surface-light p-8">
          <h2 className="font-display text-3xl text-ivory text-center">Welcome Back</h2>
          <p className="text-stone text-sm text-center mt-2">Sign in to continue shopping</p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-clay/10 border border-clay/10 rounded-xl px-4 py-3">
                <p className="text-clay text-sm">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-stone text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-stone text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald hover:bg-emerald-dark text-deep-forest font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-stone text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald hover:text-emerald-dark transition-colors">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
